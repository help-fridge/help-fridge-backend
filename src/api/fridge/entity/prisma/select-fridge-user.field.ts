import { Prisma } from '@prisma/client';

const SELECT_FRIDGE_USER_FIELD = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    idx: true,
  },
});

export type SelectFridgeUserField = Prisma.UserGetPayload<
  typeof SELECT_FRIDGE_USER_FIELD
>;
