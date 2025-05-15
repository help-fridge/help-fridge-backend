import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { UpdateFridgeDto } from './update-fridge.dto';

export class UpdateFridgeListDto {
  /**
   * 삭제 이유
   * @example 먹음
   */
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFridgeDto)
  fridgeList: UpdateFridgeDto[];
}
