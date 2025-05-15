import { Unit } from '@prisma/client';

export class FoodUnitEntity {
  idx: number;
  name: string;

  constructor(data: FoodUnitEntity) {
    Object.assign(this, data);
  }

  static from(unit: Unit): FoodUnitEntity {
    return new FoodUnitEntity({
      idx: unit.idx,
      name: unit.name,
    });
  }
}
