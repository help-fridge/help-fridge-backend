import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/common/guards/auth.guard';
import { FoodEntity } from 'src/api/food/entity/food.entity';
import { GetFoodAllDto } from 'src/api/food/dto/get-food-all.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  /**
   * food name이 포함되는 food 조회.
   * 음식 추가할 때 음식 검색해서 추가하기 위해 사용
   */
  @UseGuards(AuthGuard)
  @Get('')
  @ApiQuery({
    name: 'name',
    required: true,
    example: '간장',
    description: '검색할 음식 이름 (부분일치)',
  })
  async getFridgeListByFoodName(
    @Query() dto: GetFoodAllDto,
  ): Promise<FoodEntity[]> {
    return await this.foodService.getFoodAll(dto);
  }
}
