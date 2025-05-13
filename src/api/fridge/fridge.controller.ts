import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { User } from 'src/common/decorator/user.decorator';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';
import { Sort } from './common/decorators/fridge-sort.decorator';
import { CreateFridgeListDto } from './dto/create-fridge-list.dto';
import { DeleteFridgeDto } from './dto/delete-fridge.dto';
import { UpdateFridgeListDto } from './dto/update-fridge-list.dto';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  /**
   * 냉장고에 가지고 있는 음식조회
   * @param sort 이름 오름차순, 넣은날짜 오름차순, 만료날짜 오름차순
   */
  @UseGuards(AuthGuard)
  @Get('/all')
  async getAllFridgeByUserIdx(
    @User('idx') userIdx: number,
    @Sort() sort: string,
  ) {
    return await this.fridgeService.getAllFridgeByUserIdx(userIdx, sort);
  }

  /**
   * 소비기한 3일 이하 조회 (지난 것은 제외)
   */
  @UseGuards(AuthGuard)
  @Get('/notification')
  async getFridgeListToBeConsumed(@User('idx') userIdx: number) {
    return await this.fridgeService.getFridgeListToBeConsumed(userIdx);
  }

  /**
   * 냉장고에 음식 넣기 (여러 개)
   */
  @UseGuards(AuthGuard)
  @Post()
  async createFridge(
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

  /**
   * 수량 update || storage idx update
   */
  @UseGuards(AuthGuard)
  @Patch('/:idx')
  async updateFridgeByFridgeIdx(
    @User('idx') userIdx: number,
    @Body() updateFridgeListDto: UpdateFridgeListDto,
  ) {
    return await this.fridgeService.updateFridgeListByFridgeIdx(
      updateFridgeListDto.fridgeList,
      userIdx,
      updateFridgeListDto.reason,
    );
  }

  /**
   * 냉장고에 음식 삭제 후 history 테이블에 삽입 (여러 개)
   */
  @UseGuards(AuthGuard)
  @Delete('/many')
  async deleteFridgeListByFridgeIdx(
    @User('idx') userIdx: number,
    @Body() deleteFridgeList: DeleteFridgeDto,
  ) {
    return await this.fridgeService.deleteFridgeListByFridgeIdx({
      reason: deleteFridgeList.reason,
      userIdx,
      fridgeIdxList: deleteFridgeList.fridgeIdxList,
    });
  }
}
