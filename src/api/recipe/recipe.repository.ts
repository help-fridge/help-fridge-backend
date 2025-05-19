import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/module/prisma.service';
import { RecipeSort } from './common/enums/recipe-sort.enum';
import { RecommendRecipe } from './interfaces/recommend-recipe.interface';
import { GetRecommendRecipeAllInput } from './input/get-recommend-recipe-all.input';
import { recommendType } from './common/constants/recommend-type.constant';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  async selectRecipeMatchStats(
    input: GetRecommendRecipeAllInput
  ): Promise<RecommendRecipe[]> {
    const orderBySort =
      input.type === recommendType.NEAR
        ? `ORDER BY "nearExpiringCount" DESC, "nearExpiringRatio" DESC`
        : `ORDER BY "totalOwnedRatio" DESC, "nearExpiringRatio" DESC, "totalOwnedCount" DESC`;
    const userIdx = input.userIdx;

    const query = `
      SELECT 
        JSON_BUILD_OBJECT(
          'idx', r.idx,
          'id', r.id,
          'name', r.name,
          'ingredient', JSON_AGG(
            JSON_BUILD_OBJECT(
              'idx', food.idx,
              'name', food.name,
              'category', JSON_BUILD_OBJECT(
                'idx', fc.idx,
                'name', fc.name
              )
            )
          )
        ) AS recipe,
        COUNT(DISTINCT f.food_idx) AS "nearExpiringCount",
        COUNT(DISTINCT fa.food_idx) AS "totalOwnedCount",
        COUNT(DISTINCT rf.food_idx) AS "totalIngredientCount",
        ROUND(100.0 * COUNT(DISTINCT f.food_idx) / COUNT(DISTINCT rf.food_idx), 1) AS "nearExpiringRatio",
        ROUND(100.0 * COUNT(DISTINCT fa.food_idx) / COUNT(DISTINCT rf.food_idx), 1) AS "totalOwnedRatio"
      FROM
        recipe_food_tb rf
      LEFT JOIN (
        SELECT
          f_inner.*
        FROM
          fridge_tb f_inner
        JOIN
          food_tb ft ON f_inner.food_idx = ft.idx
        WHERE
          COALESCE(
            f_inner.expired_at,
            f_inner.created_at + (ft.expiration || ' days')::INTERVAL
          ) <= (
            DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Seoul') AT TIME ZONE 'Asia/Seoul'
            + INTERVAL '3 days'
          )
        AND
          f_inner.user_idx = ${userIdx}
      ) f
      ON
        rf.food_idx = f.food_idx
      LEFT JOIN
        fridge_tb fa
      ON
        rf.food_idx = fa.food_idx
      AND fa.user_idx = ${userIdx}
      JOIN
        food_tb food
      ON
        rf.food_idx = food.idx  
      JOIN
        food_category_tb fc
      ON
        food.category_idx = fc.idx
      JOIN
        recipe_tb r
      ON
        rf.recipe_idx = r.idx
      GROUP BY
        r.idx, r.id, r.name
      HAVING
        COUNT(DISTINCT f.food_idx) > 0
      ${orderBySort}
      LIMIT
        20;
    `;

    return await this.prisma.$queryRawUnsafe(query);
  }
}
