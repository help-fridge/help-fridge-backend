import { FoodCategoryEntity } from 'src/api/food/entity/food-category.entity';
import { UnitEntity } from 'src/common/entity/unit.entity';
import { SelectFoodField } from 'src/api/food/entity/prisma/select-food.field';

export class FoodEntity {
  idx: number;
  name: string;
  category: FoodCategoryEntity;
  unit: UnitEntity[];
  expiration: number;

  constructor(data: FoodEntity) {
    Object.assign(this, data);
  }

  static from(food: SelectFoodField): FoodEntity {
    return new FoodEntity({
      idx: food.idx,
      name: food.name,
      category: FoodCategoryEntity.from(food.foodCategory),
      unit: food.foodUnit.map(({ unit }) => UnitEntity.from(unit)),
      expiration: food.expiration,
    });
  }
}
