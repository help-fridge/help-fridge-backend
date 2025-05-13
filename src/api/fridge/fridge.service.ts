import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FridgeRepository } from './fridge.repository';
import { CreateFridgeInput } from './input/create-fridge.input';
import { DeleteFridgeInput } from './input/delete-fridge.input';
import { generateYMD } from './common/utils/date.util';
import { UpdateFridgeDto } from './dto/update-fridge.dto';

@Injectable()
export class FridgeService {
  constructor(private readonly fridgeRepository: FridgeRepository) {}

  /**
   * 냉장고에 가지고 있는 음식조회
   * @param sort 이름 오름차순, 넣은날짜 오름차순, 만료날짜 오름차순
   */
  async getAllFridgeByUserIdx(userIdx: number, sort: string) {
    return await this.fridgeRepository.selectAllFridgeByUserIdx(userIdx, sort);
  }

  /**
   * 소비기한 3일 이하 조회 (지난 것은 제외)
   */
  async getFridgeListToBeConsumed(userIdx: number) {
    return await this.fridgeRepository.selectFridgeToBeConsumed(userIdx);
  }

  /**
   * 냉장고에 음식 넣기
   */
  async createFridge(createFridgeInput: CreateFridgeInput) {
    const storageIdx =
      await this.fridgeRepository.selectStorageIdxByStorageName(
        createFridgeInput.storage,
      );
    if (!storageIdx) {
      throw new BadRequestException('유효하지 않은 저장 방식입니다.');
    }

    if (
      !(await this.fridgeRepository.selectFoodByFoodId(
        createFridgeInput.foodId,
      ))
    ) {
      throw new NotFoundException('존재하지 않는 음식입니다.');
    }

    const { addedAt, expiredAt, ...rest } = createFridgeInput;

    let expiration: number | null = null;
    if (!expiredAt) {
      expiration = await this.fridgeRepository.selectCategoryByFoodId(
        createFridgeInput.foodId,
      );

      if (!expiration) {
        throw new NotFoundException('해당 소비기한을 찾을 수 없습니다.');
      }
    }

    const modifiedInput = {
      ...rest,
      addedAt: addedAt ?? generateYMD(),
      expiredAt: expiredAt ?? generateYMD(expiration as number),
    };

    return await this.fridgeRepository.insertFridge(modifiedInput, storageIdx);
  }

  /**
   * 수량 update || storage idx update
   */
  async updateFridgeListByFridgeIdx(
    updateFridgeList: UpdateFridgeDto[],
    userIdx: number,
    reason: string,
  ) {
    return await this.fridgeRepository.runTransaction(async (tx) => {
      const fridgeIdxList = updateFridgeList.map((item) => item.fridgeIdx);
      const fridgeList =
        await this.fridgeRepository.selectFridgeListByFridgeIdxList(
          fridgeIdxList,
          tx,
        );

      const reasonIdx =
        await this.fridgeRepository.selectReasonByReasonName(reason);
      if (!reasonIdx) {
        throw new BadRequestException('해당 이유가 존재하지 않습니다.');
      }

      const historyInsertList = [];

      for (const item of updateFridgeList) {
        const { fridgeIdx, amount, storage } = item;
        if (amount && storage) {
          throw new BadRequestException(
            'amount와 storage는 한 개만 올 수 있습니다.',
          );
        }

        if (amount) {
          const target = fridgeList.find((target) => target.idx === fridgeIdx);
          if (!target) {
            throw new BadRequestException(
              `존재하지 않거나 권한이 없는 fridge: ${fridgeIdx}`,
            );
          }

          const diff = target.amount - amount;
          await this.fridgeRepository.updateFridgeAmountByFridgeIdx(
            amount,
            fridgeIdx,
            userIdx,
            tx,
          );

          if (diff > 0) {
            historyInsertList.push({
              foodId: target.food_id,
              userIdx,
              reasonIdx,
              amount: diff,
              addedAt: new Date(),
            });
          }
        }

        if (storage) {
          const storageIdx =
            await this.fridgeRepository.selectStorageIdxByStorageName(storage);
          if (!storageIdx) {
            throw new BadRequestException('유효하지 않은 저장 방식입니다.');
          }
          await this.fridgeRepository.updateFridgeStorageIdxByFridgeIdx(
            storageIdx,
            fridgeIdx,
            userIdx,
            tx,
          );
        }
      }

      if (historyInsertList.length > 0) {
        await this.fridgeRepository.insertFoodHistories(historyInsertList, tx);
      }
    });
  }

  /**
   * 냉장고에 음식 삭제 후 history 테이블에 삽입
   */
  async deleteFridgeListByFridgeIdx(deleteFridgeInput: DeleteFridgeInput) {
    const reasonIdx = await this.fridgeRepository.selectReasonByReasonName(
      deleteFridgeInput.reason,
    );
    if (!reasonIdx) {
      throw new BadRequestException('해당 이유가 존재하지 않습니다.');
    }

    await this.fridgeRepository.runTransaction(async (tx) => {
      const fridgeList =
        await this.fridgeRepository.selectFridgeListByFridgeIdxList(
          deleteFridgeInput.fridgeIdxList,
          tx,
        );
      if (fridgeList.length === 0) {
        throw new NotFoundException('삭제할 냉장고 항목이 없습니다.');
      }

      const historyRowList = fridgeList.map((f) => ({
        foodId: f.food_id,
        userIdx: deleteFridgeInput.userIdx,
        reasonIdx: reasonIdx,
        amount: f.amount,
        addedAt: f.added_at,
      }));

      await this.fridgeRepository.insertFoodHistories(historyRowList, tx);
      await this.fridgeRepository.deleteFridgeListByFridgeIdxList(
        deleteFridgeInput.fridgeIdxList,
        tx,
      );
    });
  }
}
