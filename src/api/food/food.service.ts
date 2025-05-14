import { Injectable } from '@nestjs/common';
import { FoodRepository } from './food.repository';
import { SelectFood } from './type/select-food.type';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  /**
   * food name이 포함되는 food 조회
   */
  async getFridgeListByFoodName(name: string): Promise<SelectFood[]> {
    return await this.foodRepository.selectFoodByFoodName(name);
  }
}
