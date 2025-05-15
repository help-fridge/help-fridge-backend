import { Module } from '@nestjs/common';
import { LocalAccountRepository } from 'src/api/account/local-account.repository';
import { LocalAccountService } from 'src/api/account/local-account.service';

@Module({
  imports: [],
  providers: [LocalAccountService, LocalAccountRepository],
  exports: [LocalAccountService],
  controllers: [],
})
export class LocalAccountModule {}
