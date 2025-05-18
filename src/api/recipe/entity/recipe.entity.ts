import { IngredientEntity } from './Ingredient.entity';

export class RecipeEntity {
  idx: number;

  id: number;

  name: string;

  ingredient: IngredientEntity[];

  constructor(data: RecipeEntity) {
    Object.assign(this, data);
  }
}
