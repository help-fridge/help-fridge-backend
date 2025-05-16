import { IsIn, IsInt, Min } from 'class-validator';
import { fridgeHistoryReason } from 'src/api/fridge-history/constants/fridge-history-reason.constants';

export class UpdateFridgeAmountDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsInt()
  @IsIn(Object.values(fridgeHistoryReason))
  reasonIdx: number;
}
