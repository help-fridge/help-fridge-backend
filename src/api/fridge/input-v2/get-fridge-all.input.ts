import { StorageType } from 'src/api/fridge/common/constants/storage-type.constant';
import { SortType } from '../common/constants/sort-type.constant';

export class GetFridgeAllInput {
  userIdx: number;
  storageType?: StorageType;
  sortType?: SortType;
}
