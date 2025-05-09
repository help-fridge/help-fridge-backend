import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { User } from 'src/common/decorator/user.decorator';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';
import { Sort } from './common/decorators/fridge-sort.decorator';
import { CreateFridgeDto } from './dto/create-fridge.dto';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  @UseGuards(AuthGuard)
  @Get('/all')
  async getAllFridgeByUserIdx(
    @User('idx') userIdx: number,
    @Sort() sort: string,
  ) {
    return await this.fridgeService.getAllFridgeByUserIdx(userIdx, sort);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createFridge(
    @User('idx') userIdx: number,
    @Body() createFridgeDto: CreateFridgeDto,
  ) {
    return await this.fridgeService.createFridge({
      foodId: createFridgeDto.foodId,
      userIdx,
      storage: createFridgeDto.storage,
      amount: createFridgeDto.amount,
      addedAt: createFridgeDto.addedAt,
      expiredAt: createFridgeDto.expiredAt,
    });
  }
}
