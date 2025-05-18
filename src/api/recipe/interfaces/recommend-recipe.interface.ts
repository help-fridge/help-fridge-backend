import { RecipeEntity } from '../entity/recipe.entity';

export interface RecommendRecipe {
  recipe: RecipeEntity;
  nearExpiringCount: number;
  totalOwnedCount: number;
  totalIngredientCount: number;
  nearExpiringRatio: number;
  totalOwnedRatio: number;
}
