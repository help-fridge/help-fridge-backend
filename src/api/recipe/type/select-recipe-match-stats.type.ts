export class SelectRecipeMatchStats {
  /**
   * 레시피 이름
   * @example 굴두부탕
   */
  recipeName: string;

  /**
   * 레시피 id
   * @example 3178344
   */
  recipeId: string;

  /**
   * 레시피에 사용되는 보유 중인 소비기한 임박한 재료 개수
   * @example 2
   */
  nearExpiringCount: number;

  /**
   * 레시피에 사용되는 보유 중인 재료 개수 (소비기한 임박 상관 없음)
   * @example 2
   */
  totalOwnedCount: number;

  /**
   * 레시피 재료 개수
   * @example 4
   */
  totalIngredientCount: number;

  /**
   * (레시피에 사용되는 보유 중인 소비기한 임박한 재료 개수) / (레시피 재료 개수) * 100 를 계산한 비율
   * @example 50%
   */
  nearExpiringRatio: string;

  /**
   * (레시피에 사용되는 보유 중인 재료 개수) / (레시피 재료 개수) * 100 를 계산한 비율
   * @example 50%
   */
  totalOwnedRatio: string;

  /**
   * 레시피 상세 링크
   * @example https://www.10000recipe.com/recipe/3178344
   */
  recipeUrl: string;
}
