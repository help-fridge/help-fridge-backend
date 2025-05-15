import { FoodCategory } from '@prisma/client';

export class FoodCategoryEntity {
  idx: number;
  name: string;

  constructor(data: FoodCategoryEntity) {
    Object.assign(this, data);
  }

  static from(category: FoodCategory): FoodCategoryEntity {
    return new FoodCategoryEntity({
      idx: category.idx,
      name: category.name,
    });
  }
}
