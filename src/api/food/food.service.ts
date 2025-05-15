import { Injectable } from '@nestjs/common';
import { FoodRepository } from './food.repository';
import { FoodEntity } from 'src/api/food/entity/food.entity';
import { CreateFoodInput } from 'src/api/food/input/create-food.input';
import { UpdateFoodInput } from 'src/api/food/input/update-food.input';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async getFoodByIdx(idx: number): Promise<FoodEntity | null> {
    const food = await this.foodRepository.selectFoodByIdx(idx);

    return food && FoodEntity.from(food);
  }

  async getFoodAll(): Promise<FoodEntity[]> {
    const foods = await this.foodRepository.selectFoodAll();

    return foods.map((food) => FoodEntity.from(food));
  }

  async createFood(input: CreateFoodInput): Promise<FoodEntity> {
    const food = await this.foodRepository.insertFood(input);

    return FoodEntity.from(food);
  }

  async updateFood(idx: number, input: UpdateFoodInput): Promise<void> {
    const food = await this.foodRepository.updateFoodByIdx(idx, input);

    return;
  }

  async deleteFood(idx: number): Promise<void> {
    await this.foodRepository.deleteFoodByIdx(idx);

    return;
  }
}
