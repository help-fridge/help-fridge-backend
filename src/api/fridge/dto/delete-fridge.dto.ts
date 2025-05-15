import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteFridgeDto {
  /**
   * 삭제 이유
   * @example 먹음
   */
  @IsString()
  @IsNotEmpty()
  reason: string;

  /**
   * 삭제할 fridge idx list
   */
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  fridgeIdxList: number[];
}
