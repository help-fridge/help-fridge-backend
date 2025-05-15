import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';
import { SelectFood } from './type/select-food.type';

@Injectable()
export class FoodRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * food name이 포함되는 food 조회
   */
  async selectFoodByFoodName(name: string) {
    return await this.prisma.$queryRaw<SelectFood[]>`
      SELECT
        f.id AS "foodId",
        f.name AS "foodName", 
        u.idx AS "unitIdx",
        u.name AS "unitName",
        f.expiration AS "expiration",
        c.name AS "categoryName",
        c.code AS "categoryCode",
        c.expiration AS "categoryExpiration",
        f.category_code AS "categoryCode"
      FROM 
        food_tb f
      JOIN 
        unit_tb u
      ON 
        f.unit_idx = u.idx
      WHERE 
        f.name ILIKE '%' || ${name} || '%'
      ORDER BY
        (LOWER(f.name) = LOWER(${name})) DESC,
        POSITION(LOWER(${name}) IN LOWER(f.name)),
        LENGTH(f.name)
    `;
  }
}
