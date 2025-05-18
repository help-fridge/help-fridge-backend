import { RECIPE_URL } from '../common/constants/recipe-link.constant';
import { RecommendRecipe } from '../interfaces/recommend-recipe.interface';
import { RecipeEntity } from './recipe.entity';

export class RecommendRecipeEntity {
  recipe: RecipeEntity;

  nearExpiringCount: number;

  totalOwnedCount: number;

  totalIngredientCount: number;

  nearExpiringRatio: number;

  totalOwnedRatio: number;

  url: string;

  constructor(data: RecommendRecipeEntity) {
    Object.assign(this, data);
  }

  static fromRaw(data: RecommendRecipe): RecommendRecipeEntity {
    return new RecommendRecipeEntity({
      recipe: data.recipe,
      nearExpiringCount: Number(data.nearExpiringCount),
      totalOwnedCount: Number(data.totalOwnedCount),
      totalIngredientCount: Number(data.totalIngredientCount),
      nearExpiringRatio: data.nearExpiringRatio,
      totalOwnedRatio: data.totalOwnedRatio,
      url: RECIPE_URL + data.recipe.id,
    });
  }
}
