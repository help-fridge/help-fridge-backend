export const storageType = {
  REFR: 1,
  FROZ: 2,
  DRAW: 3,
} as const;

export type StorageType = (typeof storageType)[keyof typeof storageType];
