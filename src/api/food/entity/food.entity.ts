import { FoodCategoryEntity } from 'src/api/food/entity/food-category.entity';
import { FoodUnitEntity } from 'src/api/food/entity/food-unit.entity';
import { SelectFood } from 'src/api/food/type/select-food.type';

export class FoodEntity {
  id: string;
  name: string;
  category: FoodCategoryEntity;
  unit: FoodUnitEntity;
  expiration: number;

  constructor(data: FoodEntity) {
    Object.assign(this, data);
  }

  static from(data: SelectFood): FoodEntity {
    return new FoodEntity({
      id: data.foodId,
      name: data.foodName,
      category: FoodCategoryEntity.from(data),
      unit: FoodUnitEntity.from(data),
      expiration: data.expiration,
    });
  }
}
