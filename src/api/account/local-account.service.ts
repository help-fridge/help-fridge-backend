import { Injectable } from '@nestjs/common';
import { LocalAccount } from '@prisma/client';
import { CreateLocalAccountInput } from 'src/api/account/input/create-local-account.input';
import { LocalAccountRepository } from 'src/api/account/local-account.repository';

@Injectable()
export class LocalAccountService {
  constructor(private readonly accountRepository: LocalAccountRepository) {}

  async getAccountById(id: string) {
    return this.accountRepository.selectAccountById(id);
  }

  async createAccount(
    userIdx: number,
    input: CreateLocalAccountInput,
  ): Promise<LocalAccount> {
    return this.accountRepository.insertUser(userIdx, input);
  }
}
