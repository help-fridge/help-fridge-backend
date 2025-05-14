import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Sort } from './common/decorators/recipe-sort.decorator';
import { SelectRecipeMatchStats } from './type/select-recipe-match-stats.type';
import { ApiQuery } from '@nestjs/swagger';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * 현재 냉장고에 있는 재료들로 레시피 추천
   */
  @UseGuards(AuthGuard)
  @Get('/recommend')
  @ApiQuery({
    name: 'sort',
    example: '간장',
    description:
      '레시피 추천 기준(sort === near_expiring 이면 "버리기 싫어요" api, sort === total_owned 이면 "나가기 귀찮아요" api',
  })
  async recommendRecipeByExpiringOrOwned(
    @User('idx') userIdx: number,
    @Sort() sort: string,
  ): Promise<SelectRecipeMatchStats[]> {
    return await this.recipeService.recommendRecipeByExpiringOrOwned(
      userIdx,
      sort,
    );
  }
}
