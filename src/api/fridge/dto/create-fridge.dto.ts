import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateFridgeDto {
  @IsString()
  @IsNotEmpty()
  foodId: string;

  @IsString()
  @IsNotEmpty()
  storage: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  addedAt: Date | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiredAt: Date | null;
}
