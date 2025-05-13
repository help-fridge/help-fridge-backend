import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  /**
   * food name이 포함되는 food 조회
   */
  @UseGuards(AuthGuard)
  @Get('')
  async getFridgeListByFoodName(@Query('name') name: string) {
    return await this.foodService.getFridgeListByFoodName(name);
  }
}
