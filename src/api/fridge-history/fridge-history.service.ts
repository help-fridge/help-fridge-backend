import { Injectable } from '@nestjs/common';
import { FridgeHistoryRepository } from 'src/api/fridge-history/fridge-history.repository';
import { CreateFridgeHistoryInput } from 'src/api/fridge-history/input/create-fridge-history.input';
import { UpdateFridgeHistoryInput } from 'src/api/fridge-history/input/update-fridge-history.input';

@Injectable()
export class FridgeHistoryService {
  constructor(
    private readonly fridgeHistoryRepository: FridgeHistoryRepository,
  ) {}

  /**
   * Entity가 없으므로 사용하지 마십시오.
   *
   * @deprecated
   */
  public async getFridgeHistoryByIdx(idx: number) {
    return await this.fridgeHistoryRepository.selectFridgeHistoryByIdx(idx);
  }

  /**
   * Entity가 없으므로 사용하지 마십시오.
   *
   * @deprecated
   */
  public async getFridgeHistoryByAll() {
    return await this.fridgeHistoryRepository.selectFridgeHistoryByAll();
  }

  public async createFridgeHistory(
    input: CreateFridgeHistoryInput,
  ): Promise<void> {
    await this.fridgeHistoryRepository.insertFridgeHistory(input);
  }

  public async updateFridgeHistoryByIdx(
    idx: number,
    input: UpdateFridgeHistoryInput,
  ) {
    return await this.fridgeHistoryRepository.updateFridgeHistoryByIdx(
      idx,
      input,
    );
  }

  public async deleteFridgeHistoryByIdx(idx: number) {
    return await this.fridgeHistoryRepository.deleteFridgeHistoryByIdx(idx);
  }
}
