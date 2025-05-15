import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDate,
  IsInt,
  IsIn,
} from 'class-validator';
import {
  StorageType,
  storageType,
} from 'src/api/fridge/common/constants/storage-type.constant';

export class CreateFridgeDto {
  /**
   * 음식 idx
   * @example 1
   */
  @IsInt()
  @IsNotEmpty()
  foodIdx: number;

  /**
   * 저장 공간 이름
   * @example 냉장
   */
  @IsNotEmpty()
  @IsIn(Object.values(storageType))
  storage: StorageType;

  /**
   * 수량
   * @example 7
   */
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  /**
   * 단위 idx
   */
  @IsInt()
  unitIdx: number;

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
