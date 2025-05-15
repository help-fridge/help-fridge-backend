import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFridgeStorageDto {
  /**
   * 저장 공간 이름
   * @example 냉장
   */
  @IsString()
  @IsNotEmpty()
  storage: string;
}
