import { Injectable } from '@nestjs/common';
import { LocalAccount } from '@prisma/client';
import { CreateLocalAccountInput } from 'src/api/account/input/create-local-account.input';
import { PrismaService } from 'src/common/module/prisma.service';

@Injectable()
export class LocalAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async selectAccountById(id: string): Promise<LocalAccount | null> {
    return await this.prisma.localAccount.findFirst({
      where: {
        id,
      },
    });
  }

  public async insertUser(
    userIdx: number,
    input: CreateLocalAccountInput,
  ): Promise<LocalAccount> {
    return await this.prisma.localAccount.create({
      data: {
        idx: userIdx,
        id: input.id,
        pw: input.pw,
      },
    });
  }
}
