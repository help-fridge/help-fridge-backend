export class SelectFood {
  /**
   * 음식 id
   * @example P12002
   */
  foodId: string;

  /**
   * 음식 이름
   * @example 간장
   */
  foodName: string;

  unitIdx: number;

  /**
   * 단위 이름
   * @example ml
   */
  unitName: string;

  /**
   * 카테고리 이름
   */
  categoryName: string;

  /**
   * 카테고리 코드
   */
  categoryCode: string;

  /**
   * 카테고리 만료일
   * @example 7
   */
  expiration: number;

  /**
   * 저장 공간 idx
   * @example 2
   */
  storageIdx: number;
}
