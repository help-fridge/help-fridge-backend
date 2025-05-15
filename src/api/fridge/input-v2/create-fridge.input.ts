import { StorageType } from 'src/api/fridge/common/constants/storage-type.constant';

export class CreateFridgeInput {
  foodIdx: number;
  storage: StorageType;
  amount: number;
  unitIdx: number;
  expiredAt: Date | null;
}
