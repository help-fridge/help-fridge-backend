import { PartialType, PickType } from '@nestjs/swagger';
import { CreateFridgeHistoryInput } from 'src/api/fridge-history/input/create-fridge-history.input';

export class UpdateFridgeHistoryInput extends PartialType(
  PickType(CreateFridgeHistoryInput, ['reasonIdx', 'amount']),
) {}
