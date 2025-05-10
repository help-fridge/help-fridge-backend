import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { User } from 'src/common/decorator/user.decorator';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';
import { Sort } from './common/decorators/fridge-sort.decorator';
import { CreateFridgeListDto } from './dto/create-fridge-list.dto';
import { DeleteFridgeDto } from './dto/delete-fridge.dto';

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
   * 냉장고에 음식 삭제 후 history 테이블에 삽입 (여러 개)
   */
  @UseGuards(AuthGuard)
  @Delete('/many')
  async deleteFridgeListByFridgeIdx(
    @User('idx') userIdx: number,
    @Body() deleteFridgeList: DeleteFridgeDto,
  ) {
    return this.fridgeService.deleteFridgeListByFridgeIdx({
      reason: deleteFridgeList.reason,
      userIdx,
      fridgeIdxList: deleteFridgeList.fridgeIdxList,
    });
  }
}
