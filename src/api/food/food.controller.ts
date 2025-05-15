import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/common/guards/auth.guard';
import { FoodEntity } from 'src/api/food/entity/food.entity';
import { GetFoodAllDto } from 'src/api/food/dto/get-food-all.dto';
import { CreateFoodInput } from 'src/api/food/input/create-food.input';

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
  async getFoodAll(@Query() dto: GetFoodAllDto): Promise<FoodEntity[]> {
    return await this.foodService.getFoodAll(dto);
  }

  /**
   * 음식 추가하는 API
   */
  @UseGuards(AuthGuard)
  @Post('')
  async createFood(@Body() dto: CreateFoodInput): Promise<FoodEntity> {
    return await this.foodService.createFood(dto);
  }

  /**
   * 음식을 수정하는 API
   */
  @UseGuards(AuthGuard)
  @Put('/:idx')
  async updateFood(
    @Query('idx', ParseIntPipe) idx: number,
    @Body() dto: CreateFoodInput,
  ): Promise<void> {
    return await this.foodService.updateFood(idx, dto);
  }

  /**
   * 음식을 삭제하는 API
   */
  @UseGuards(AuthGuard)
  @Post('/delete/:idx')
  async deleteFood(@Query('idx', ParseIntPipe) idx: number): Promise<void> {
    return await this.foodService.deleteFood(idx);
  }
}
