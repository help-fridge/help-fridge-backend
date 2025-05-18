import { FoodEntity } from 'src/api/food/entity/food.entity';
import { PickType } from '@nestjs/swagger';
import { FoodCategoryEntity } from 'src/api/food/entity/food-category.entity';

export class IngredientEntity extends PickType(FoodEntity, [
  'idx',
  'name',
  'category',
]) {
  idx: number;

  name: string;

  category: FoodCategoryEntity;

  constructor(data: IngredientEntity) {
    super();
    Object.assign(this, data);
  }
}
