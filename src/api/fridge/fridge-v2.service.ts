import { Injectable } from '@nestjs/common';
import { FridgeEntity } from 'src/api/fridge/entity/fridge.entity';
import { FridgeV2Repository } from 'src/api/fridge/fridge-v2.repository';
import { CreateFridgeInput } from 'src/api/fridge/input-v2/create-fridge.input';
import { GetFridgeAllInput } from 'src/api/fridge/input-v2/get-fridge-all.input';

@Injectable()
export class FridgeV2Service {
  constructor(private readonly fridgeRepository: FridgeV2Repository) {}

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
    input: CreateFridgeInput,
  ): Promise<void> {
    await this.fridgeRepository.updateFridgeByIdx(fridgeIdx, input);
  }

  public async deleteFridge(idx: number): Promise<void> {
    await this.fridgeRepository.deleteFridgeByIdx(idx);
  }
}
