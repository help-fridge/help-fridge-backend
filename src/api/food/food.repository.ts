import { Injectable } from '@nestjs/common';
import { SelectFoodField } from 'src/api/food/entity/prisma/select-food.field';
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
