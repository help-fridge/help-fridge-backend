import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateFridgeDto } from './create-fridge.dto';

export class CreateFridgeListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFridgeDto)
  fridgeList: CreateFridgeDto[];
}
