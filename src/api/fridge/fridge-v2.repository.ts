import { Injectable } from '@nestjs/common';
import { SelectFridgeField } from 'src/api/fridge/entity/prisma/select-fridge.field';
import { FridgeV2Service } from 'src/api/fridge/fridge-v2.service';
import { CreateFridgeInput } from 'src/api/fridge/input-v2/create-fridge.input';
import { GetFridgeAllInput } from 'src/api/fridge/input-v2/get-fridge-all.input';
import { UpdateFridgeInput } from 'src/api/fridge/input-v2/update-fridge.input';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class FridgeV2Repository {
  constructor(private readonly prisma: PrismaService) {}

  public async selectFridgeByIdx(
    idx: number,
  ): Promise<SelectFridgeField | null> {
    return await this.prisma.fridge.findUnique({
      where: { idx },
      select: {
        idx: true,
        storage: true,
        createdAt: true,
        amount: true,
        expiredAt: true,
        unit: {
          select: {
            idx: true,
            name: true,
          },
        },
        food: {
          select: {
            idx: true,
            name: true,
            expiration: true,
            foodUnit: {
              select: {
                unit: {
                  select: {
                    idx: true,
                    name: true,
                  },
                },
              },
            },
            foodCategory: {
              select: {
                idx: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            idx: true,
          },
        },
      },
    });
  }

  public async selectFridgeByAll(
    input: GetFridgeAllInput,
  ): Promise<SelectFridgeField[]> {
    return await this.prisma.fridge.findMany({
      where: {
        userIdx: input.userIdx,
        storageIdx: input.type,
      },
      select: {
        idx: true,
        storage: true,
        createdAt: true,
        amount: true,
        expiredAt: true,
        unit: {
          select: {
            idx: true,
            name: true,
          },
        },
        food: {
          select: {
            idx: true,
            name: true,
            expiration: true,
            foodUnit: {
              select: {
                unit: {
                  select: {
                    idx: true,
                    name: true,
                  },
                },
              },
            },
            foodCategory: {
              select: {
                idx: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            idx: true,
          },
        },
      },
    });
  }

  public async insertFridge(
    userIdx: number,
    input: CreateFridgeInput,
  ): Promise<SelectFridgeField> {
    return await this.prisma.fridge.create({
      select: {
        idx: true,
        storage: true,
        createdAt: true,
        amount: true,
        expiredAt: true,
        unit: {
          select: {
            idx: true,
            name: true,
          },
        },
        food: {
          select: {
            idx: true,
            name: true,
            expiration: true,
            foodUnit: {
              select: {
                unit: {
                  select: {
                    idx: true,
                    name: true,
                  },
                },
              },
            },
            foodCategory: {
              select: {
                idx: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            idx: true,
          },
        },
      },
      data: {
        userIdx,
        foodIdx: input.foodIdx,
        storageIdx: input.storage,
        amount: input.amount,
        unitIdx: input.unitIdx,
        expiredAt: input.expiredAt,
      },
    });
  }

  public async updateFridgeByIdx(
    idx: number,
    input: UpdateFridgeInput,
  ): Promise<void> {
    await this.prisma.fridge.update({
      where: { idx },
      data: {
        foodIdx: input.foodIdx,
        storageIdx: input.storage,
        amount: input.amount,
        unitIdx: input.unitIdx,
        expiredAt: input.expiredAt,
      },
    });
  }

  public async deleteFridgeByIdx(idx: number): Promise<void> {
    await this.prisma.fridge.delete({
      where: { idx },
    });
  }
}
