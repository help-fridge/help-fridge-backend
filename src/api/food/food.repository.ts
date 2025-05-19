import { Injectable } from '@nestjs/common';
import { SelectFoodField } from 'src/api/food/entity/prisma/select-food.field';
import { CreateFoodInput } from 'src/api/food/input/create-food.input';
import { GetFoodAllInput } from 'src/api/food/input/get-food-all.input';
import { UpdateFoodInput } from 'src/api/food/input/update-food.input';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class FoodRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async selectFoodByIdx(idx: number): Promise<SelectFoodField | null> {
    return await this.prisma.food.findUnique({
      where: { idx },
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
    });
  }

  public async selectFoodAll(
    input: GetFoodAllInput,
  ): Promise<SelectFoodField[]> {
    return await this.prisma.$queryRawUnsafe<SelectFoodField[]>(`
      SELECT
        f.idx,
        f.name,
        f.expiration,
        JSONB_BUILD_OBJECT(
          'idx', fc.idx,
          'name', fc.name
        ) AS "foodCategory",
        jsonb_agg(
          JSONB_BUILD_OBJECT(
            'unit', JSONB_BUILD_OBJECT(
              'idx', u.idx,
              'name', u.name
            )
          )
        ) FILTER (WHERE u.idx IS NOT NULL) AS "foodUnit"
      FROM
        food_tb f
      LEFT JOIN
        food_category_tb fc
      ON
        f.category_idx = fc.idx
      LEFT JOIN
        food_unit_tb fu
      ON
        f.idx = fu.food_idx
      LEFT JOIN
        unit_tb u
      ON
        fu.unit_idx = u.idx
      ${input.name ? `WHERE f.name ILIKE '%' || $1 || '%'` : ''}
      GROUP BY
        f.idx,
        f.name,
        f.expiration,
        fc.idx,
        fc.name
      ORDER BY LENGTH(f.name) ASC, f.name ASC
      ${input.name ? '' : 'LIMIT 10'};
    `, ...(input.name ? [input.name] : []));



    // return await this.prisma.food.findMany({
    //   where: {
    //     name: input.name
    //       ? {
    //           contains: input.name,
    //         }
    //       : undefined,
    //     foodUnit: {
    //       some: {},
    //     },
    //   },
    //   select: {
    //     idx: true,
    //     name: true,
    //     expiration: true,
    //     foodUnit: {
    //       select: {
    //         unit: {
    //           select: {
    //             idx: true,
    //             name: true,
    //           },
    //         },
    //       },
    //     },
    //     foodCategory: {
    //       select: {
    //         idx: true,
    //         name: true,
    //       },
    //     },
    //   },
    //   take: input.name ? undefined : 10,
    //   orderBy: {
    //     idx: 'desc',
    //   },
    // });
  }

  public async insertFood(input: CreateFoodInput): Promise<SelectFoodField> {
    return await this.prisma.food.create({
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
      data: {
        name: input.name,
        expiration: input.expiration,
        foodUnit: {
          createMany: {
            data: input.unitIdxList.map((unitIdx) => ({
              unitIdx,
            })),
          },
        },
        foodCategory: {
          connect: {
            idx: input.categoryIdx,
          },
        },
      },
    });
  }

  public async updateFoodByIdx(
    idx: number,
    input: UpdateFoodInput,
  ): Promise<void> {
    await this.prisma.food.update({
      where: {
        idx,
      },
      data: {
        name: input.name,
        expiration: input.expiration,
        foodUnit: input.unitIdxList
          ? {
              deleteMany: {},
              createMany: {
                data: input.unitIdxList.map((unitIdx) => ({
                  unitIdx,
                })),
              },
            }
          : undefined,
        foodCategory: {
          connect: {
            idx: input.categoryIdx,
          },
        },
      },
    });
  }

  public async deleteFoodByIdx(idx: number): Promise<void> {
    await this.prisma.food.delete({
      where: {
        idx,
      },
    });
  }

  /**
   * food name이 포함되는 food 조회
   */
  // async selectFoodByFoodName(name: string) {
  //   return await this.prisma.$queryRaw<SelectFood[]>`
  //     SELECT
  //       f.id AS "foodId",
  //       f.name AS "foodName",
  //       u.idx AS "unitIdx",
  //       u.name AS "unitName",
  //       f.expiration AS "expiration",
  //       c.name AS "categoryName",
  //       c.code AS "categoryCode",
  //       c.expiration AS "categoryExpiration",
  //       f.category_code AS "categoryCode"
  //     FROM
  //       food_tb f
  //     JOIN
  //       unit_tb u
  //     ON
  //       f.unit_idx = u.idx
  //     WHERE
  //       f.name ILIKE '%' || ${name} || '%'
  //     ORDER BY
  //       (LOWER(f.name) = LOWER(${name})) DESC,
  //       POSITION(LOWER(${name}) IN LOWER(f.name)),
  //       LENGTH(f.name)
  //   `;
  // }
}
