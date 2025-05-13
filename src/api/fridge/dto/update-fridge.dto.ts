import {
  IsOptional,
  IsNumber,
  Min,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFridgeDto {
  @IsNumber()
  @Type(() => Number)
  fridgeIdx: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  storage?: string;
}
