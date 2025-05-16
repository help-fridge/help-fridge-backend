import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';
import { RecipeSort } from './common/enums/recipe-sort.enum';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  async selectRecipeMatchStats(
    userIdx: number,
    sort: string,
  ): Promise<
    {
      recipeName: string;
      recipeId: string;
      nearExpiringCount: number;
      totalOwnedCount: number;
      totalIngredientCount: number;
      nearExpiringRatio: number;
      totalOwnedRatio: number;
    }[]
  > {
    const orderBySort =
      sort === RecipeSort.NEAR_EXPIRING
        ? `ORDER BY "nearExpiringCount" DESC, "nearExpiringRatio" DESC`
        : `ORDER BY "totalOwnedRatio" DESC, "nearExpiringRatio" DESC, "totalOwnedCount" DESC`;

    const query = `
      SELECT 
        r.name AS "recipeName",
        rf.recipe_idx AS "recipeIdx",
        COUNT(DISTINCT f.food_idx) AS "nearExpiringCount",
        COUNT(DISTINCT fa.food_idx) AS "totalOwnedCount",
        COUNT(DISTINCT rf.food_idx) AS "totalIngredientCount",
        ROUND(100.0 * COUNT(DISTINCT f.food_idx) / COUNT(DISTINCT rf.food_idx), 1) AS "nearExpiringRatio",
        ROUND(100.0 * COUNT(DISTINCT fa.food_idx) / COUNT(DISTINCT rf.food_idx), 1) AS "totalOwnedRatio"
      FROM
        recipe_food_tb rf
      LEFT JOIN (
        SELECT
          *
        FROM
          fridge_tb
        WHERE
          expired_at <= (
            DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Seoul') AT TIME ZONE 'Asia/Seoul' 
            + INTERVAL '3 days'
          )
        AND
          user_idx = ${userIdx}
      ) f
      ON
        rf.food_idx = f.food_idx
      LEFT JOIN
        fridge_tb fa
      ON
        rf.food_idx = fa.food_idx
      AND fa.user_idx = ${userIdx}
      JOIN
        recipe_tb r
      ON
        rf.recipe_idx = r.idx
      GROUP BY
        rf.recipe_idx, r.name
      HAVING
        COUNT(DISTINCT f.food_idx) > 0
      ${orderBySort}
      LIMIT
        20;
    `;

    return await this.prisma.$queryRawUnsafe(query);
  }
}
