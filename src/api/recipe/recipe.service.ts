import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  async getRecipeMatchStats(userIdx: number) {
    const rawStats =
      await this.recipeRepository.selectRecipeMatchStats(userIdx);

    return rawStats.map((row: any) => ({
      ...row,
      nearExpiringCount: Number(row.nearExpiringCount),
      totalOwnedCount: Number(row.totalOwnedCount),
      totalIngredientCount: Number(row.totalIngredientCount),
    }));
  }
}
