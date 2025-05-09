export class CreateFridgeDto {
  foodId: string;
  storage: string;
  amount: string;
  addedAt: Date | null;
  expiredAt: Date | null;
}
