import { Injectable } from '@nestjs/common';
import { FridgeRepository } from './fridge.repository';

@Injectable()
export class FridgeService {
  constructor(private readonly fridgeRepository: FridgeRepository) {}

  async getAllFridgeByUserIdx(userIdx: number, sort: string) {
    return await this.fridgeRepository.selectAllFridgeByUserIdx(userIdx, sort);
  }
}
