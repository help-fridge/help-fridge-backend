import { IsNumber, Min, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFridgeDto {
  /**
   * 업데이트하려는 냉장고 idx
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  fridgeIdx: number;

  /**
   * 변경된 수량 (먹은 수량가 아니라 변경된 수량)
   * @example 6
   */
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}
