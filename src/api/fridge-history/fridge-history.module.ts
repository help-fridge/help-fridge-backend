import { Module } from '@nestjs/common';
import { FridgeHistoryRepository } from 'src/api/fridge-history/fridge-history.repository';
import { FridgeHistoryService } from 'src/api/fridge-history/fridge-history.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FridgeHistoryService, FridgeHistoryRepository],
  exports: [],
})
export class FridgeHistoryModule {}
