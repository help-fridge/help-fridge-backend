import { SelectUserField } from 'src/api/user/entity/prisma/select-user.field';

export class UserEntity {
  idx: number;
  nickname: string;
  createdAt: Date;

  constructor(data: UserEntity) {
    Object.assign(this, data);
  }

  static from(user: SelectUserField): UserEntity {
    return new UserEntity({
      idx: user.idx,
      nickname: user.nickname,
      createdAt: user.createdAt,
    });
  }
}
