import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FridgeHistoryService } from 'src/api/fridge-history/fridge-history.service';
import { FridgeEntity } from 'src/api/fridge/entity/fridge.entity';
import { FridgeV2Repository } from 'src/api/fridge/fridge-v2.repository';
import { CreateFridgeInput } from 'src/api/fridge/input-v2/create-fridge.input';
import { GetFridgeAllInput } from 'src/api/fridge/input-v2/get-fridge-all.input';
import { UpdateFridgeAmountInput } from 'src/api/fridge/input-v2/update-fridge-amount.input';
import { UpdateFridgeInput } from 'src/api/fridge/input-v2/update-fridge.input';

@Injectable()
export class FridgeV2Service {
  constructor(
    private readonly fridgeRepository: FridgeV2Repository,
    private readonly fridgeHistoryService: FridgeHistoryService,
  ) {}

  public async getFridgeByIdx(idx: number): Promise<FridgeEntity | null> {
    const fridge = await this.fridgeRepository.selectFridgeByIdx(idx);

    return fridge && FridgeEntity.from(fridge);
  }

  public async getFridgeAll(input: GetFridgeAllInput): Promise<FridgeEntity[]> {
    return (await this.fridgeRepository.selectFridgeByAll(input)).map(
      FridgeEntity.from,
    );
  }

  public async createFridge(
    userIdx: number,
    input: CreateFridgeInput,
  ): Promise<FridgeEntity> {
    const fridge = await this.fridgeRepository.insertFridge(userIdx, input);

    return FridgeEntity.from(fridge);
  }

  public async updateFridge(
    fridgeIdx: number,
    input: UpdateFridgeInput,
  ): Promise<void> {
    await this.fridgeRepository.updateFridgeByIdx(fridgeIdx, input);
  }

  public async deleteFridge(idx: number): Promise<void> {
    await this.fridgeRepository.deleteFridgeByIdx(idx);
  }

  public async updateFridgeAmount(
    idx: number,
    input: UpdateFridgeAmountInput,
  ): Promise<void> {
    const fridge = await this.fridgeRepository.selectFridgeByIdx(idx);

    if (!fridge) {
      throw new NotFoundException('Cannot find fridge');
    }

    if (input.amount > fridge.amount) {
      throw new BadRequestException('Amount is too large');
    }

    await this.fridgeHistoryService.createFridgeHistory({
      userIdx: fridge.user.idx,
      foodIdx: fridge.food.idx,
      unitIdx: fridge.unit.idx,
      reasonIdx: input.reasonIdx,
      amount: input.amount,
    });

    if (input.amount == fridge.amount) {
      await this.fridgeRepository.deleteFridgeByIdx(idx);
    }

    if (input.amount < fridge.amount) {
      await this.fridgeRepository.updateFridgeByIdx(idx, {
        amount: fridge.amount - input.amount,
      });
    }
  }
}
