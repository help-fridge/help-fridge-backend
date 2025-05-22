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
    const sortType = input.sortType;

    const orderByClause =
      sortType === 1
        ? `ORDER BY COALESCE(f.expired_at, f.created_at + (fd.expiration || ' days')::INTERVAL) ASC`
        : sortType === 2
          ? `ORDER BY fd.name ASC`
          : sortType === 3
            ? `ORDER BY f.created_at ASC`
            : '';

    const whereClause = `
      WHERE f.user_idx = ${input.userIdx}
      ${input.storageType !== undefined ? `AND f.storage_idx = ${input.storageType}` : ''}
    `;

    return await this.prisma.$queryRawUnsafe(`
      SELECT 
        f.idx AS "idx",
        json_build_object(
          'idx', s.idx,
          'name', s.name
        ) AS "storage",
        f.created_at AS "createdAt",
        f.amount AS "amount",
        f.expired_at AS "expiredAt",
        json_build_object(
          'idx', u.idx,
          'name', u.name
        ) AS "unit",
        json_build_object(
          'idx', fd.idx,
          'name', fd.name,
          'expiration', fd.expiration,
          'foodUnit', (
            SELECT
              json_agg(
                json_build_object(
                  'unit', json_build_object(
                    'idx', fu.idx,
                    'name', fu.name
                  )
                )
              )
            FROM
              food_unit_tb fut
            JOIN
              unit_tb fu
            ON
              fut.unit_idx = fu.idx
            WHERE
              fut.food_idx = fd.idx
          ),
          'foodCategory', json_build_object(
            'idx', fc.idx,
            'name', fc.name
          )
        ) AS "food",
        json_build_object(
          'idx', usr.idx
        ) AS "user"
      FROM
        fridge_tb f
      JOIN
        storage_tb s
      ON
        f.storage_idx = s.idx
      JOIN
        user_tb usr
      ON
        f.user_idx = usr.idx
      JOIN
        food_tb fd
      ON
        f.food_idx = fd.idx
      JOIN
        unit_tb u
      ON
        f.unit_idx = u.idx
      
      LEFT JOIN
        food_category_tb fc
      ON
        fd.category_idx = fc.idx
      ${whereClause}
      ${orderByClause}
    `);
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
        storageIdx: input.storage,
        unitIdx: input.unitIdx,
        expiredAt: input.expiredAt,
        amount: input.amount,
      },
    });
  }

  public async deleteFridgeByIdx(idx: number): Promise<void> {
    await this.prisma.fridge.delete({
      where: { idx },
    });
  }
}
