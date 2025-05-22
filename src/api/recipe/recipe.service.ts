import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { RecommendRecipeEntity } from './entity/recommend-recipe.entity';
import { GetRecommendRecipeAllInput } from './input/get-recommend-recipe-all.input';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  async recommendRecipeByExpiringOrOwned(
    input: GetRecommendRecipeAllInput,
  ): Promise<RecommendRecipeEntity[]> {
    return (await this.recipeRepository.selectRecipeMatchStats(input)).map(
      (row) => RecommendRecipeEntity.fromRaw(row),
    );
  }
}
