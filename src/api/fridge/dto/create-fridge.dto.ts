import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateFridgeDto {
  /**
   * 음식 id
   * @example R18020
   */
  @IsString()
  @IsNotEmpty()
  foodId: string;

  /**
   * 저장 공간 이름
   * @example 냉장
   */
  @IsString()
  @IsNotEmpty()
  storage: string;

  /**
   * 수량
   * @example 7
   */
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  /**
   * 넣은 날짜(utc). 시분초 제외
   * @example 2025-05-20T15:00:00.00Z
   * @default: 시분초를 제거한 UTC 기준의 오늘 날짜
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  addedAt: Date | null;

  /**
   * 만료 날짜(utc). 시분초 제외
   * @example 2025-05-29T15:00:00.00Z
   * @default: 시분초를 제거한 UTC 기준의 오늘 날짜
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiredAt: Date | null;
}
