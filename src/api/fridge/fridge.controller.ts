import { Controller, Get, UseGuards } from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { User } from 'src/common/decorator/user.decorator';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';
import { Sort } from './common/decorators/fridge-sort.decorator';

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
}
