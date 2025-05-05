import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { FridgeRepository } from './fridge.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FridgeController],
  providers: [FridgeService, FridgeRepository],
})
export class FridgeModule {}
