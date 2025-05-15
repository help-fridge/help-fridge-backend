import { SelectFood } from 'src/api/food/type/select-food.type';

export class FoodUnitEntity {
  idx: number;
  name: string;

  constructor(data: FoodUnitEntity) {
    Object.assign(this, data);
  }

  static from(data: SelectFood): FoodUnitEntity {
    return new FoodUnitEntity({
      idx: data.unitIdx,
      name: data.unitName,
    });
  }
}
