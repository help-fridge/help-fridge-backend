import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';
import { CreateFridgeInput } from './input/create-fridge.input';

@Injectable()
export class FridgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async selectAllFridgeByUserIdx(
    userIdx: number,
    sort: string,
  ): Promise<FridgeEntity[]> {
    const query = `
      SELECT
        fr.idx AS idx,
        fr.amount AS amount,
        fr.added_at AS "addedAt",
        DATE_PART('day', fr.expired_at - NOW()) + 1 AS "expireIn",
        fd.name AS "foodName",
        u.name AS "unitName",
        c.name AS "categoryName",
        c.code AS "categoryCode"
      FROM fridge_tb fr
      JOIN food_tb fd ON fr.food_id = fd.id
      JOIN unit_tb u ON fd.unit_idx = u.idx
      JOIN category_tb c ON fd.category_code = c.code
      WHERE fr.user_idx = $1
      ORDER BY ${sort}
    `;

    return await this.prisma.$queryRawUnsafe(query, userIdx);
  }

  async selectStorageIdxByStorageName(name: string): Promise<number | null> {
    const [storageIdx] = await this.prisma.$queryRaw<{ idx: number }[]>`
      SELECT idx
      FROM storage_tb
      WHERE name = ${name}
    `;

    return storageIdx.idx ?? null;
  }

  async selectCategoryByFoodId(foodId: string): Promise<number | null> {
    const [result] = await this.prisma.$queryRaw<{ expiration: number }[]>`
      SELECT c.expiration
      FROM food_tb f
      JOIN category_tb c ON f.category_code = c.code
      WHERE f.id = ${foodId}
    `;

    return result.expiration ?? null;
  }

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
      ${createFridgeInput.foodId}, ${createFridgeInput.userIdx}, ${storageIdx}, ${createFridgeInput.amount}, ${createFridgeInput.addedAt}, ${createFridgeInput.expiredAt}
    )
  `;
  }
}
