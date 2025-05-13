import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  async selectRecipeMatchStats(userIdx: number): Promise<
    {
      recipeName: string;
      recipeId: string;
      nearExpiringCount: bigint;
      totalOwnedCount: bigint;
      totalIngredientCount: bigint;
      nearExpiringRatio: string;
      totalOwnedRatio: string;
    }[]
  > {
    return await this.prisma.$queryRaw`
      SELECT 
        r.name AS "recipeName",
        rf.recipe_id AS "recipeId",
        COUNT(DISTINCT f.food_id) AS "nearExpiringCount",
        COUNT(DISTINCT fa.food_id) AS "totalOwnedCount",
        COUNT(*) AS "totalIngredientCount",
        ROUND(100.0 * COUNT(DISTINCT f.food_id) / COUNT(*), 1) AS "nearExpiringRatio",
        ROUND(100.0 * COUNT(DISTINCT fa.food_id) / COUNT(*), 1) || '%' AS "totalOwnedRatio"
      FROM
        recipe_food_tb rf
      LEFT JOIN (
        SELECT
          *
        FROM
          fridge_tb
        WHERE
          expired_at <= CURRENT_DATE + INTERVAL '3 days'
        AND
          user_idx = 1
      ) f
      ON
        rf.food_id = f.food_id
      LEFT JOIN
        fridge_tb fa
      ON
        rf.food_id = fa.food_id
      AND fa.user_idx = ${userIdx}
      JOIN
        recipe_tb r
      ON
        rf.recipe_id = r.id
      GROUP BY
        rf.recipe_id, r.name
      HAVING
        COUNT(DISTINCT f.food_id) > 0
      ORDER BY 
        "nearExpiringCount" DESC,
        "nearExpiringRatio" DESC
      LIMIT
        20;
    `;
  }
}
