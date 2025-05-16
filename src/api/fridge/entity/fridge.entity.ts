import { IsIn } from 'class-validator';
import { FoodEntity } from 'src/api/food/entity/food.entity';
import { StorageType } from 'src/api/fridge/common/constants/storage-type.constant';
import { FridgeUserEntity } from 'src/api/fridge/entity/fridge-user.entity';
import { SelectFridgeField } from 'src/api/fridge/entity/prisma/select-fridge.field';
import { UnitEntity } from 'src/common/entity/unit.entity';

export class FridgeEntity {
  idx: number;

  storage: StorageType;

  food: FoodEntity;

  unit: UnitEntity;

  user: FridgeUserEntity;

  amount: number;

  createdAt: Date;

  expiredAt: Date | null;

  constructor(data: FridgeEntity) {
    Object.assign(this, data);
  }

  static from(fridge: SelectFridgeField): FridgeEntity {
    return new FridgeEntity({
      idx: fridge.idx,
      storage: fridge.storage.idx as any,
      food: FoodEntity.from(fridge.food),
      unit: UnitEntity.from(fridge.unit),
      user: FridgeUserEntity.from(fridge.user),
      amount: fridge.amount,
      createdAt: fridge.createdAt,
      expiredAt: fridge.expiredAt,
    });
  }
}
