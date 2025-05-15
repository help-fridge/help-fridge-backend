import { Unit } from '@prisma/client';

export class UnitEntity {
  idx: number;
  name: string;

  constructor(data: UnitEntity) {
    Object.assign(this, data);
  }

  static from(unit: Unit): UnitEntity {
    return new UnitEntity({
      idx: unit.idx,
      name: unit.name,
    });
  }
}
