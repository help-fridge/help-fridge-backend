export class CreateFridgeInput {
  foodId: string;
  userIdx: number;
  storage: string;
  amount: number;
  addedAt: Date | null;
  expiredAt: Date | null;
}
