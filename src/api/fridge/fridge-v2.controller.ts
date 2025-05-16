import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/api/auth/common/guards/auth.guard';
import { CreateFridgeDto } from 'src/api/fridge/dto-v2/create-fridge.dto';
import { GetFridgeAllDto } from 'src/api/fridge/dto-v2/get-fridge-all.dto';
import { UpdateFridgeAmountDto } from 'src/api/fridge/dto-v2/update-fridge-amount.dto';
import { UpdateFridgeDto } from 'src/api/fridge/dto-v2/update-fridge.dto';
import { FridgeEntity } from 'src/api/fridge/entity/fridge.entity';
import { FridgeV2Service } from 'src/api/fridge/fridge-v2.service';
import { User } from 'src/common/decorator/user.decorator';

@Controller('/v2/fridge')
export class FridgeV2Controller {
  constructor(private readonly fridgeService: FridgeV2Service) {}

  /**
   * 냉장고에 있는 음식 조회
   */
  @Get('')
  @UseGuards(AuthGuard)
  public async getFridgeAll(
    @Query() dto: GetFridgeAllDto,
    @User('idx') userIdx: number,
  ): Promise<FridgeEntity[]> {
    const data = await this.fridgeService.getFridgeAll({
      ...dto,
      userIdx,
    });
    return data;
  }

  @Post('')
  @UseGuards(AuthGuard)
  public async createFridge(
    @Body() dto: CreateFridgeDto,
    @User('idx') userIdx: number,
  ): Promise<FridgeEntity> {
    return await this.fridgeService.createFridge(userIdx, dto);
  }

  @Put('/:idx')
  @UseGuards(AuthGuard)
  public async updateFridge(
    @Body() dto: UpdateFridgeDto,
    @User('idx') userIdx: number,
  ): Promise<void> {
    return await this.fridgeService.updateFridge(userIdx, dto);
  }

  @Delete('/:idx')
  @UseGuards(AuthGuard)
  public async deleteFridge(@Query('idx') idx: number): Promise<void> {
    return await this.fridgeService.deleteFridge(idx);
  }

  @Put('/:idx/amount')
  @UseGuards(AuthGuard)
  public async updateFridgeAmount(
    @Body() dto: UpdateFridgeAmountDto,
    @Param('idx', ParseIntPipe) idx: number,
    @User('idx') userIdx: number,
  ): Promise<void> {
    return await this.fridgeService.updateFridgeAmount(idx, dto);
  }
}
