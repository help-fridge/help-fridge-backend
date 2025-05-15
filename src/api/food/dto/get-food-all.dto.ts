import { IsOptional, IsString } from 'class-validator';

export class GetFoodAllDto {
  /**
   * 이름
   *
   * @example "사과"
   */
  @IsOptional()
  @IsString()
  name: string;
}
