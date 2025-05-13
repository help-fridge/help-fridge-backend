import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { RECIPE_URL } from './common/constants/recipe-link.constant';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  async recommendRecipeByExpiringOrOwned(userIdx: number, sort: string) {
    const queryResult = await this.recipeRepository.selectRecipeMatchStats(
      userIdx,
      sort,
    );

    return queryResult.map((row: any) => ({
      ...row,
      nearExpiringCount: Number(row.nearExpiringCount),
      totalOwnedCount: Number(row.totalOwnedCount),
      totalIngredientCount: Number(row.totalIngredientCount),
      nearExpiringRatio: row.nearExpiringRatio + '%',
      totalOwnedRatio: row.totalOwnedRatio + '%',
      recipeUrl: RECIPE_URL + row.recipeId,
    }));
  }
}
