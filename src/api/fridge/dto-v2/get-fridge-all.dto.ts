import { IsIn } from 'class-validator';
import {
  storageType,
  StorageType,
} from 'src/api/fridge/common/constants/storage-type.constant';

export class GetFridgeAllDto {
  @IsIn(Object.values(storageType))
  type?: StorageType;
}
