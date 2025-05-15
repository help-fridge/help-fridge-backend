import { Prisma } from '@prisma/client';

const SELECT_FRIDGE_FIELD = Prisma.validator<Prisma.FridgeDefaultArgs>()({
  select: {
    idx: true,
    storage: true,
    createdAt: true,
    amount: true,
    expiredAt: true,
    unit: {
      select: {
        idx: true,
        name: true,
      },
    },
    food: {
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
    },
    user: {
      select: {
        idx: true,
      },
    },
  },
});

export type SelectFridgeField = Prisma.FridgeGetPayload<
  typeof SELECT_FRIDGE_FIELD
>;
