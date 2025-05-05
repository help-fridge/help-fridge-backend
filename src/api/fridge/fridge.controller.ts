import { Controller, Get, UseGuards } from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { User } from 'src/common/decorator/user.decorator';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  @UseGuards(AuthGuard)
  @Get('/all')
  async getAllFridgeByUserIdx(@User('idx') userIdx: number) {
    return await this.fridgeService.getAllFridgeByUserIdx(userIdx);
  }
}
