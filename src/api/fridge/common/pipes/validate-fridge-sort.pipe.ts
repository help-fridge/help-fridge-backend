import { Injectable, PipeTransform } from '@nestjs/common';
import { FridgeSort } from '../../enums/fridge-sort.enum';

/**
 * 냉장고 정렬 검증 파이프
 * - 요청된 sort 값이 FridgeSort 열거형에 포함되어 있는지 검증
 *
 * 유효하지 않은 sort 값인 경우 null return
 */
@Injectable()
export class ValidateFridgeSortPipe implements PipeTransform {
  transform(value: string): FridgeSort | null {
    const sort = Object.values(FridgeSort).find(
      (p) => p.toLowerCase() === value.toLowerCase(),
    );

    if (!sort) {
      return null;
    }

    return sort;
  }
}
