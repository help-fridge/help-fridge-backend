import { PickType } from '@nestjs/swagger';
import { SelectFridgeUserField } from 'src/api/fridge/entity/prisma/select-fridge-user.field';
import { UserEntity } from 'src/api/user/entity/user.entity';

export class FridgeUserEntity extends PickType(UserEntity, ['idx']) {
  constructor(data: FridgeUserEntity) {
    super();
    Object.assign(this, data);
  }

  static from(user: SelectFridgeUserField): FridgeUserEntity {
    return new FridgeUserEntity({
      idx: user.idx,
    });
  }
}
