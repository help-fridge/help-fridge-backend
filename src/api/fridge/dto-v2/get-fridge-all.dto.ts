import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import {
  storageType,
  StorageType,
} from 'src/api/fridge/common/constants/storage-type.constant';
import { SortType, sortType } from '../common/constants/sort-type.constant';

export class GetFridgeAllDto {
  @Type(() => Number)
  @IsIn(Object.values(storageType))
  @IsOptional()
  storageType?: StorageType;

  @Type(() => Number)
  @IsIn(Object.values(sortType))
  @IsOptional()
  sortType?: SortType;
}
