import { IsNumber, Min, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFridgeDto {
  @IsNumber()
  @Type(() => Number)
  fridgeIdx: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}
