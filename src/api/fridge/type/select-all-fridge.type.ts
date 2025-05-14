export class SelectAllFridge {
  /**
   * fridge idx
   * @example 25
   */
  fridgeIdx: number;

  /**
   * 보유 수량
   * @example 9
   */
  amount: number;

  /**
   * 넣은 날짜 (utc)
   * @example 2025-05-11T15:00:00.000Z
   */
  addedAt: Date;

  /**
   * 만료까지 남은 일수
   * @example 1
   */
  expireIn: number;

  /**
   * 음식 이름
   * @example 두부
   */
  foodName: string;

  /**
   * 단위 이름
   * @example 개
   */
  unitName: string;

  /**
   * 저장 공간 idx
   * @example 2
   */
  storageIdx: number;

  /**
   * 저장 공간 이름
   * @example 냉동
   */
  storageName: string;

  /**
   * 카테고리 이름
   * @example 두부류 또는 묵류
   */
  categoryName: string;

  /**
   * 카테고리 코드
   * @example P06
   */
  categoryCode: number;
}
