export const sortType = {
  EXP: 1,
  NAME: 2,
  ADDED: 3,
} as const;

export type SortType = (typeof sortType)[keyof typeof sortType];
