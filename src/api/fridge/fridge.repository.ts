import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class FridgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async selectAllFridgeByUserIdx(
    userIdx: number,
    sort: string,
  ): Promise<FridgeEntity[]> {
    const query = `
      SELECT
        fr.idx AS idx,
        fr.amount AS amount,
        fr.added_at AS "addedAt",
        DATE_PART('day', fr.expired_at - NOW()) + 1 AS "expireIn",
        fd.name AS "foodName",
        u.name AS "unitName",
        c.name AS "categoryName",
        c.code AS "categoryCode"
      FROM fridge_tb fr
      JOIN food_tb fd ON fr.food_idx = fd.idx
      JOIN unit_tb u ON fd.unit_idx = u.idx
      JOIN category_tb c ON fd.category_code = c.code
      WHERE fr.user_idx = $1
      ORDER BY ${sort}
    `;

    return await this.prisma.$queryRawUnsafe(query, userIdx);
  }
}
