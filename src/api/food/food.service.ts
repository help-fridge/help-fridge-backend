import { Injectable } from '@nestjs/common';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  /**
   * food name이 포함되는 food 조회
   */
  async getFridgeListByFoodName(name: string) {
    return await this.foodRepository.selectFoodByFoodName(name);
  }
}
