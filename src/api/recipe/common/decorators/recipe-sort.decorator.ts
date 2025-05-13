import { Query } from '@nestjs/common';
import { ValidateRecipeSortPipe } from '../pipes/validate-recipe-sort.pipe';

/**
 * 레시피 정렬 파라미터를 검증하는 데코레이터
 */
export function Sort() {
  return Query('sort', ValidateRecipeSortPipe);
}
