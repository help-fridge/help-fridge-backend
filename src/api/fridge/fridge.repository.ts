import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class FridgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async selectAllFridgeByUserIdx(userIdx: number) {
    const fridge = await this.prisma.$queryRaw<FridgeEntity[]>`
      SELECT
        r.idx As idx,
        r.amount As amount,
        r.added_at As "addedAt",
        DATE_PART('day', r.expired_at - NOW()) + 1 AS "expireIn",
        f.name AS "foodName",
        u.name AS "unitName",
        c.name AS "categoryName",
        c.code AS "categoryCode"
      FROM refrigerator_tb r
      JOIN food_tb f ON r.food_idx = f.idx
      JOIN unit_tb u ON f.unit_idx = u.idx
      JOIN category_tb c ON f.category_code = c.code
      WHERE r.user_idx = ${userIdx};
    `;

    return fridge ?? null;
  }
}
