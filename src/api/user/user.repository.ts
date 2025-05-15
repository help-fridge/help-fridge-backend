import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserInput } from 'src/api/user/input/create-user.input';
import { UpdateUserInput } from 'src/api/user/input/update-user.input';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async selectUserByIdx(idx: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        idx,
      },
    });
  }

  /**
   * @deprecated
   */
  async selectUserById(id: string): Promise<UserQueryResult | null> {
    const [user] = await this.prisma.$queryRaw<UserQueryResult[]>`
      SELECT *
      FROM user_tb
      WHERE id = ${id}
    `;

    return user ?? null;
  }

  async insertUser(input: CreateUserInput): Promise<User> {
    return await this.prisma.user.create({
      data: {
        nickname: input.nickname,
      },
    });
  }

  async updateUser(userIdx: number, input: UpdateUserInput): Promise<User> {
    return await this.prisma.user.update({
      where: {
        idx: userIdx,
      },
      data: {
        nickname: input.nickname,
      },
    });
  }

  async deleteUser(userIdx: number): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        idx: userIdx,
      },
    });
  }

  // /**
  //  * @deprecated
  //  */
  // async createUser(signupInput: SignupInput) {
  //   return await this.prisma.$queryRaw`
  //     INSERT INTO user_tb(id, pw, nickname)
  //     VALUES (${signupInput.id}, ${signupInput.pw}, ${signupInput.nickname})
  //   `;
  // }
}
