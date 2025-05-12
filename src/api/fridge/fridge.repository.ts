import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';
import { CreateFridgeInput } from './input/create-fridge.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class FridgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 냉장고에 가지고 있는 음식 조회
   */
  async selectAllFridgeByUserIdx(
    userIdx: number,
    sort: string,
  ): Promise<FridgeEntity[]> {
    const query = `
      SELECT
        fr.idx AS fridgeIdx,
        fr.amount AS amount,
        fr.added_at AS "addedAt",
        DATE_PART('day', fr.expired_at - NOW()) AS "expireIn",
        fd.name AS "foodName",
        u.name AS "unitName",
        c.name AS "categoryName",
        c.code AS "categoryCode"

      FROM fridge_tb fr

      JOIN food_tb fd
      ON fr.food_id = fd.id

      JOIN unit_tb u
      ON fd.unit_idx = u.idx

      JOIN category_tb c
      ON fd.category_code = c.code

      WHERE fr.user_idx = $1
      
      ORDER BY ${sort}
    `;

    return await this.prisma.$queryRawUnsafe(query, userIdx);
  }

  /**
   * storage idx 조회
   */
  async selectStorageIdxByStorageName(name: string): Promise<number | null> {
    const [result] = await this.prisma.$queryRaw<{ idx: number }[]>`
      SELECT idx
      FROM storage_tb
      WHERE name = ${name}
    `;

    return result.idx ?? null;
  }

  /**
   * foodId 를 통해서 category 테이블의 expiration 조회
   */
  async selectCategoryByFoodId(foodId: string): Promise<number | null> {
    const [result] = await this.prisma.$queryRaw<{ expiration: number }[]>`
      SELECT c.expiration
      FROM food_tb f
      JOIN category_tb c ON f.category_code = c.code
      WHERE f.id = ${foodId}
    `;

    return result.expiration ?? null;
  }

  /**
   * reason idx 조회
   */
  async selectReasonByReasonName(reasonName: string): Promise<number | null> {
    const [result] = await this.prisma.$queryRaw<{ idx: number }[]>`
      SELECT idx
      FROM reason_tb
      WHERE name = ${reasonName}
    `;

    return result.idx ?? null;
  }

  /**
   * 냉장 or 냉동에서 소비기한 3일 이하, 지난 거 제외 조회 + 냉동에서 1달 이상 소비하지 않은 것들 조회
   */
  async selectFridgeToBeConsumed(userIdx: number, storageIdx: number) {
    return await this.prisma.$queryRaw<
      { fridgeIdx: number; updatedAt: Date; foodName: string }[]
    >`
      SELECT 
        f.idx AS "fridgeIdx",
        f.updated_at AS "updatedAt",
        fd.name AS foodName

      FROM fridge_tb f

      JOIN food_tb fd
      ON f.food_id = fd.id

      WHERE f.user_idx = ${userIdx}
        AND f.expired_at > NOW()
        AND (
          f.expired_at <= NOW() + INTERVAL '3 days'
          OR (f.storage_idx = ${storageIdx} AND f.updated_at <= NOW() - INTERVAL '1 month')
        )
    `;
  }

  /**
   * 냉장고에 음식 넣기
   */
  async insertFridge(createFridgeInput: CreateFridgeInput, storageIdx: number) {
    return await this.prisma.$queryRaw`
      INSERT INTO fridge_tb (
        food_id,
        user_idx,
        storage_idx,
        amount,
        added_at,
        expired_at
      ) VALUES (
        ${createFridgeInput.foodId},
        ${createFridgeInput.userIdx},
        ${storageIdx},
        ${createFridgeInput.amount},
        ${createFridgeInput.addedAt},
        ${createFridgeInput.expiredAt}
      )
    `;
  }

  /**
   * 냉동실 -> 냉장실 || 냉장실 -> 냉동실 로 옮길 때 storage idx 수정
   */
  async updateFridgeStorageIdxByFridgeIdx(
    storageIdx: number,
    fridgeIdx: number,
    userIdx: number,
  ) {
    return await this.prisma.$queryRaw`
      UPDATE fridge_tb
      SET storage_idx = ${storageIdx}
      WHERE idx = ${fridgeIdx}
      AND user_idx = ${userIdx}
    `;
  }

  /**
   * 냉장고 음식 amount 수정
   */
  async updateFridgeAmountByFridgeIdx(
    amount: number,
    fridgeIdx: number,
    userIdx: number,
  ) {
    return await this.prisma.$queryRaw`
      UPDATE fridge_tb
      SET amount = ${amount}, updated_at = NOW()
      WHERE idx = ${fridgeIdx}
      AND user_idx = ${userIdx}
    `;
  }

  /**
   * 냉장고에 음식 삭제
   * transaction으로 처리
   */
  async runTransaction<T>(
    callback: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(callback);
  }

  /**
   * fridge idx 를 통해서 foodId, amount, addedAt 조회 (여러 개)
   */
  async selectFridgeListByFridgeIdxList(
    fridgeIdxList: number[],
    tx: Prisma.TransactionClient,
  ) {
    const safeFridgeIdxList: string = fridgeIdxList
      .map((i: number) => Number(i))
      .join(',');

    return await tx.$queryRawUnsafe<
      { food_id: string; amount: number; added_at: Date }[]
    >(`
      SELECT food_id, amount, added_at
      FROM fridge_tb
      WHERE idx IN (${safeFridgeIdxList})
    `);
  }

  /**
   * history 테이블에 삭제 이유와 함께 삽입 (여러 개)
   */
  async insertFoodHistories(
    rowList: {
      foodId: string;
      userIdx: number;
      reasonIdx: number;
      amount: number;
      addedAt: Date;
    }[],
    tx: Prisma.TransactionClient,
  ) {
    for (const row of rowList) {
      await tx.$queryRaw`
        INSERT INTO food_history_tb (
          food_id, user_idx, reason_idx, amount, added_at
        ) VALUES (
          ${row.foodId},
          ${row.userIdx},
          ${row.reasonIdx},
          ${row.amount},
          ${row.addedAt}
        )
      `;
    }
  }

  /**
   * 냉장고에서 음식 삭제 (여러 개)
   */
  async deleteFridgeListByFridgeIdxList(
    fridgeIdxList: number[],
    tx: Prisma.TransactionClient,
  ) {
    await tx.$queryRawUnsafe(`
      DELETE FROM fridge_tb
      WHERE idx IN (${fridgeIdxList.join(',')})
    `);
  }
}
