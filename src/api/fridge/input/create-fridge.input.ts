export class CreateFridgeInput {
  foodId: string;
  userIdx: number;
  storage: string;
  amount: string;
  addedAt: Date | null;
  expiredAt: Date | null;
}
