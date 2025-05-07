import { Param } from '@nestjs/common';
import { ValidateFridgeSortPipe } from '../pipes/validate-fridge-sort.pipe';

/**
 * 냉장고 정렬 파라미터를 검증하는 데코레이터
 */
export function Sort() {
  return Param('sort', ValidateFridgeSortPipe);
}
