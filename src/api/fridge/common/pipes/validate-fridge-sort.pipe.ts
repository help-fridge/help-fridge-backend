import { Injectable, PipeTransform } from '@nestjs/common';
import { FridgeSort } from '../../enums/fridge-sort.enum';

/**
 * 냉장고 정렬 검증 파이프
 * - 요청된 sort 값이 FridgeSort 열거형에 포함되어 있는지 검증
 */
@Injectable()
export class ValidateFridgeSortPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return 'fd.name ASC';
    }

    const sort = Object.values(FridgeSort).find(
      (p) => p.toLowerCase() === value.toLowerCase(),
    );

    if (sort === FridgeSort.NAME_ASC) {
      return 'fd.name ASC';
    } else if (sort === FridgeSort.EXPIREIN) {
      return `"expireIn" ASC`;
    } else if (sort === FridgeSort.ADDED_ASC) {
      return 'fr.added_at ASC';
    }

    return 'fd.name ASC';
  }
}
