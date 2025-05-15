import { Injectable, PipeTransform } from '@nestjs/common';
import { StorageType } from '../../enums/storage-type.enum';

/**
 * 저장공간 type 검증 파이프
 * - 요청된 type 값이 StorageType 열거형에 포함되어 있는지 검증
 */
@Injectable()
export class ValidateStorageTypePipe implements PipeTransform {
  transform(value: number): number {
    if (!value) {
      return StorageType.REFR;
    }

    const type = Object.values(StorageType).includes(value);
    if (type) {
      return value;
    }

    return StorageType.REFR;
  }
}
