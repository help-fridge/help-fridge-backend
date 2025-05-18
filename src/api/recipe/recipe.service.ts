import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { RecommendRecipeEntity } from './entity/recommend-recipe.entity';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  async recommendRecipeByExpiringOrOwned(
    userIdx: number,
    sort: string,
  ): Promise<RecommendRecipeEntity[]> {
    const queryResult = await this.recipeRepository.selectRecipeMatchStats(
      userIdx,
      sort,
    );

    return queryResult.map((row) => RecommendRecipeEntity.fromRaw(row));
  }
}
