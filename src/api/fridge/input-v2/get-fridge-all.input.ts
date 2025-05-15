import { StorageType } from 'src/api/fridge/common/constants/storage-type.constant';

export class GetFridgeAllInput {
  userIdx: number;
  type?: StorageType;
}
