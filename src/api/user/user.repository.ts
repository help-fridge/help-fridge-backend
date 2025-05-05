import { Injectable } from '@nestjs/common';
import { SignupInput } from 'src/auth/input/signup.input';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async selectUserById(id: string): Promise<UserQueryResult | null> {
    const [user] = await this.prisma.$queryRaw<UserQueryResult[]>`
      SELECT *
      FROM user_tb
      WHERE id = ${id}
    `;

    return user ?? null;
  }

  async createUser(signupInput: SignupInput) {
    return await this.prisma.$queryRaw`
      INSERT INTO user_tb(id, pw, nickname)
      VALUES (${signupInput.id}, ${signupInput.pw}, ${signupInput.nickname})
    `;
  }
}
