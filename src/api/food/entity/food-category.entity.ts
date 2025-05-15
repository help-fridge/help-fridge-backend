import { SelectFood } from 'src/api/food/type/select-food.type';

export class FoodCategoryEntity {
  code: string;
  name: string;
  expiration: number;

  constructor(data: FoodCategoryEntity) {
    Object.assign(this, data);
  }

  static from(data: SelectFood): FoodCategoryEntity {
    return new FoodCategoryEntity({
      code: data.categoryCode,
      name: data.categoryName,
      expiration: data.expiration,
    });
  }
}
