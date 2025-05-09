import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { User } from 'src/common/decorator/user.decorator';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';
import { Sort } from './common/decorators/fridge-sort.decorator';
import { CreateFridgeDto } from './dto/create-fridge.dto';
import { CreateFridgeListDto } from './dto/create-fridge-list.dto';

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
  async createFridge1(
    @User('idx') userIdx: number,
    @Body() createFridgeListDto: CreateFridgeListDto,
  ) {
    return await Promise.all(
      createFridgeListDto.fridgeList.map((dto) =>
        this.fridgeService.createFridge({
          foodId: dto.foodId,
          userIdx,
          storage: dto.storage,
          amount: dto.amount,
          addedAt: dto.addedAt,
          expiredAt: dto.expiredAt,
        }),
      ),
    );
  }
}
