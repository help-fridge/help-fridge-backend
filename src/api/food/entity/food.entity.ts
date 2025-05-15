import { FoodCategoryEntity } from 'src/api/food/entity/food-category.entity';
import { FoodUnitEntity } from 'src/api/food/entity/food-unit.entity';
import { SelectFoodField } from 'src/api/food/entity/prisma/select-food.field';

export class FoodEntity {
  idx: number;
  name: string;
  category: FoodCategoryEntity;
  unit: FoodUnitEntity[];
  expiration: number;

  constructor(data: FoodEntity) {
    Object.assign(this, data);
  }

  static from(food: SelectFoodField): FoodEntity {
    return new FoodEntity({
      idx: food.idx,
      name: food.name,
      category: FoodCategoryEntity.from(food.foodCategory),
      unit: food.foodUnit.map(({ unit }) => FoodUnitEntity.from(unit)),
      expiration: food.expiration,
    });
  }
}
