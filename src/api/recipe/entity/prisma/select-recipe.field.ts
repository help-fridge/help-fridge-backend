import { Prisma } from '@prisma/client';

const SELECT_RECIPE_FIELD = Prisma.validator<Prisma.RecipeDefaultArgs>()({
  select: {
    idx: true,
    id: true,
    name: true,
    recipeFood: {
      select: {
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
      },
    },
  },
});

export type SelectRecipeField = Prisma.RecipeGetPayload<
  typeof SELECT_RECIPE_FIELD
>;
