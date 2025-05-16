export const fridgeHistoryReason = {
  EXPIRED: 1,
  EATEN: 2,
} as const;

export type FridgeHistoryReason =
  (typeof fridgeHistoryReason)[keyof typeof fridgeHistoryReason];
