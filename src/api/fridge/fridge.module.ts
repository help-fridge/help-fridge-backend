import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { FridgeRepository } from './fridge.repository';
import { AuthModule } from 'src/api/auth/auth.module';
import { FridgeV2Controller } from 'src/api/fridge/fridge-v2.controller';
import { FridgeV2Repository } from 'src/api/fridge/fridge-v2.repository';
import { FridgeV2Service } from 'src/api/fridge/fridge-v2.service';

@Module({
  imports: [AuthModule],
  controllers: [FridgeController, FridgeV2Controller],
  providers: [
    FridgeService,
    FridgeRepository,
    FridgeV2Repository,
    FridgeV2Service,
  ],
})
export class FridgeModule {}
