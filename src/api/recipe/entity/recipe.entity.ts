import { FoodEntity } from 'src/api/food/entity/food.entity';
import { SelectRecipeField } from './prisma/select-recipe.field';

export class RecipeEntity {
  idx: number;

  id: number;

  name: string;

  food: FoodEntity[];

  constructor(data: RecipeEntity) {
    Object.assign(this, data);
  }

  static from(recipe: SelectRecipeField): RecipeEntity {
    return new RecipeEntity({
      idx: recipe.idx,
      id: recipe.id,
      name: recipe.name,
      food: recipe.recipeFood.map(({ food }) => FoodEntity.from(food)),
    });
  }
}
