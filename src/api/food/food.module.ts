import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { FoodRepository } from './food.repository';
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FoodController],
  providers: [FoodService, FoodRepository],
})
export class FoodModule {}
