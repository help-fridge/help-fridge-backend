import { Injectable, PipeTransform } from '@nestjs/common';
import { RecipeSort } from '../enums/recipe-sort.enum';

/**
 * 레시피 정렬 검증 파이프
 * - 요청된 sort 값이 RecipeSort 열거형에 포함되어 있는지 검증
 */
@Injectable()
export class ValidateRecipeSortPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return 'near_expiring';
    }

    const sort = Object.values(RecipeSort).find(
      (p) => p.toLowerCase() === value.toLowerCase(),
    );

    if (sort === RecipeSort.NEAR_EXPIRING) {
      return 'near_expiring';
    } else if (sort === RecipeSort.TOTAL_OWNED) {
      return 'total_owned';
    }

    return 'near_expiring';
  }
}
