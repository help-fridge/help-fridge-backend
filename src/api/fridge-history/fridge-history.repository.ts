import { Injectable } from '@nestjs/common';
import { FridgeHistory } from '@prisma/client';
import { CreateFridgeHistoryInput } from 'src/api/fridge-history/input/create-fridge-history.input';
import { UpdateFridgeHistoryInput } from 'src/api/fridge-history/input/update-fridge-history.input';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class FridgeHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async selectFridgeHistoryByIdx(
    idx: number,
  ): Promise<FridgeHistory | null> {
    return await this.prisma.fridgeHistory.findUnique({
      where: {
        idx,
      },
    });
  }

  public async selectFridgeHistoryByAll(): Promise<FridgeHistory[]> {
    return await this.prisma.fridgeHistory.findMany({
      orderBy: {
        idx: 'desc',
      },
    });
  }

  public async insertFridgeHistory(
    input: CreateFridgeHistoryInput,
  ): Promise<FridgeHistory> {
    return await this.prisma.fridgeHistory.create({
      data: {
        userIdx: input.userIdx,
        foodIdx: input.foodIdx,
        unitIdx: input.unitIdx,
        reasonIdx: input.reasonIdx,
        amount: input.amount,
      },
    });
  }

  public async updateFridgeHistoryByIdx(
    idx: number,
    input: UpdateFridgeHistoryInput,
  ): Promise<void> {
    await this.prisma.fridgeHistory.update({
      where: {
        idx,
      },
      data: {
        reasonIdx: input.reasonIdx,
        amount: input.amount,
      },
    });
  }

  public async deleteFridgeHistoryByIdx(idx: number): Promise<void> {
    await this.prisma.fridgeHistory.delete({
      where: {
        idx,
      },
    });
  }
}
