export const recommendType = {
  NEAR: 1,
  OWN: 2,
} as const;

export type RecommendType = (typeof recommendType)[keyof typeof recommendType];
