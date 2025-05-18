import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { User } from 'src/common/decorator/user.decorator';
import { Sort } from './common/decorators/recipe-sort.decorator';
import { SelectRecipeMatchStats } from './type/select-recipe-match-stats.type';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/common/guards/auth.guard';
import { RecommendRecipe } from './interfaces/recommend-recipe.interface';
import { RecommendRecipeEntity } from './entity/recommend-recipe.entity';

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
    example: 'near_expiring',
    description:
      '레시피 추천 기준\n- near_expiring: 소비기한 임박 재료 기반 ("버리기 싫어요" API)\n- total_owned: 보유 재료 개수 기반 ("나가기 귀찮아요" API)',
  })
  async recommendRecipeByExpiringOrOwned(
    @User('idx') userIdx: number,
    @Sort() sort: string,
  ): Promise<RecommendRecipeEntity[]> {
    return await this.recipeService.recommendRecipeByExpiringOrOwned(
      userIdx,
      sort,
    );
  }
}
