import { Injectable } from '@nestjs/common';
import { FridgeHistoryRepository } from 'src/api/fridge-history/fridge-history.repository';

@Injectable()
export class FridgeHistoryService {
  constructor(
    private readonly fridgeHistoryRepository: FridgeHistoryRepository,
  ) {}

  public async getFridgeHistoryByIdx(idx: number) {
    return await this.fridgeHistoryRepository.selectFridgeHistoryByIdx(idx);
  }

  public async getFridgeHistoryByAll() {
    return await this.fridgeHistoryRepository.selectFridgeHistoryByAll();
  }

  public async createFridgeHistory(input: any) {
    return await this.fridgeHistoryRepository.insertFridgeHistory(input);
  }

  public async updateFridgeHistoryByIdx(idx: number, input: any) {
    return await this.fridgeHistoryRepository.updateFridgeHistoryByIdx(
      idx,
      input,
    );
  }

  public async deleteFridgeHistoryByIdx(idx: number) {
    return await this.fridgeHistoryRepository.deleteFridgeHistoryByIdx(idx);
  }
}
