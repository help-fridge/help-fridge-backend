import { Prisma } from '@prisma/client';

const SELECT_USER_FIELD = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    idx: true,
    nickname: true,
    createdAt: true,
  },
});

export type SelectUserField = Prisma.UserGetPayload<typeof SELECT_USER_FIELD>;
