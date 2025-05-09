import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FridgeRepository } from './fridge.repository';
import { CreateFridgeInput } from './input/create-fridge.input';

@Injectable()
export class FridgeService {
  constructor(private readonly fridgeRepository: FridgeRepository) {}

  async getAllFridgeByUserIdx(userIdx: number, sort: string) {
    return await this.fridgeRepository.selectAllFridgeByUserIdx(userIdx, sort);
  }

  async createFridge(createFridgeInput: CreateFridgeInput) {
    const storageIdx =
      await this.fridgeRepository.selectStorageIdxByStorageName(
        createFridgeInput.storage,
      );

    if (!storageIdx) {
      throw new BadRequestException('유효하지 않은 저장 방식입니다.');
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
      addedAt: addedAt ?? new Date(),
      expiredAt:
        expiredAt ??
        new Date(Date.now() + ((expiration as number) - 1) * 86400000),
    };

    return await this.fridgeRepository.insertFridge(modifiedInput, storageIdx);
  }
}
