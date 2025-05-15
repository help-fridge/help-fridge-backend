import { Prisma } from '@prisma/client';

export const SELECT_FOOD_FIELD = Prisma.validator<Prisma.FoodDefaultArgs>()({
  select: {
    idx: true,
    name: true,
    expiration: true,
    foodUnit: {
      select: {
        unit: {
          select: {
            idx: true,
            name: true,
          },
        },
      },
    },
    foodCategory: {
      select: {
        idx: true,
        name: true,
      },
    },
  },
});

export type SelectFoodField = Prisma.FoodGetPayload<typeof SELECT_FOOD_FIELD>;
