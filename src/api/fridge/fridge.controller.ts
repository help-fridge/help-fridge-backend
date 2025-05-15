import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { UpdateFridgeStorageDto } from './dto/update-fridge-storage.dto';
import { ApiQuery } from '@nestjs/swagger';
import { SelectAllFridge } from './type/select-all-fridge.type';
import { selectFridgeToBeConsumed } from './type/select-fridge-to-be-consumed.type';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  /**
   * 메인 페이지에서 냉장고에 가지고 있는 음식조회
   */
  @UseGuards(AuthGuard)
  @Get('/all')
  @ApiQuery({
    name: 'sort',
    example: 'near_expiring',
    description:
      '냉장고 정렬 기준\n- name_asc: 이름 오름차순\n- added_asc: 넣은 날짜 오름차순\n- expire_in_asc: 만료까지 남은 일수 오름차순',
  })
  async getAllFridgeByUserIdx(
    @User('idx') userIdx: number,
    @Sort() sort: string,
  ): Promise<SelectAllFridge[]> {
    return await this.fridgeService.getAllFridgeByUserIdx(userIdx, sort);
  }

  /**
   * 소비기한 3일 이하 조회 (지난 것은 제외). 알림해줄 때 사용 (아직 보류라서 사용하는 곳 없음)
   */
  @UseGuards(AuthGuard)
  @Get('/notification')
  async getFridgeListToBeConsumed(
    @User('idx') userIdx: number,
  ): Promise<selectFridgeToBeConsumed[]> {
    return await this.fridgeService.getFridgeListToBeConsumed(userIdx);
  }

  /**
   * 냉장고에 음식 넣기 (여러 개). 음식 추가 페이지에서 사용
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
   * 냉장고 음식의 수량 update (여러 개 update 가능). 변경된 수량이 기존의 수량보다 많으면 안 됨. 메인 페이지에서 먹음 or 버림 버튼을 눌렀을 때 사용되는 api.
   * 만약에 수량이 0으로 입력되면 해당 item 삭제됨
   */
  @UseGuards(AuthGuard)
  @Patch('/many')
  async updateFridgeListByFridgeIdx(
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
   * 저장 공간 idx 변경. 현재 위치하는 저장 공간을 drag 해서 다른 저장 공간으로 옮길 때 사용되는 api
   */
  @UseGuards(AuthGuard)
  @Patch('/:idx/storage')
  async updateFridgeStorageByFridgeIdx(
    @User('idx') userIdx: number,
    @Body() updateFridgeStorageDto: UpdateFridgeStorageDto,
    @Param('idx', ParseIntPipe) fridgeIdx: number,
  ) {
    return await this.fridgeService.updateFridgeStorageByFridgeIdx(
      userIdx,
      fridgeIdx,
      updateFridgeStorageDto.storage,
    );
  }

  /**
   * 냉장고에 존재하는 음식 여러 개 삭제. 먹음 or 버림 버튼 눌러서 x 버튼 누를 때 사용하는 api
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
