import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { User } from 'src/common/decorator/user.decorator';
import { Sort } from './common/decorators/recipe-sort.decorator';
import { SelectRecipeMatchStats } from './type/select-recipe-match-stats.type';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/common/guards/auth.guard';
import { RecommendRecipe } from './interfaces/recommend-recipe.interface';
import { RecommendRecipeEntity } from './entity/recommend-recipe.entity';
import { GetRecommendRecipeAllDto } from './dto/get-recommend-recipe-all.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * 현재 냉장고에 있는 재료들로 레시피 추천
   */
  @UseGuards(AuthGuard)
  @Get('/recommend')
  async recommendRecipeByExpiringOrOwned(
    @Query() dto: GetRecommendRecipeAllDto,
    @User('idx') userIdx: number,
  ): Promise<RecommendRecipeEntity[]> {
    return await this.recipeService.recommendRecipeByExpiringOrOwned({
      ...dto,
      userIdx,
    });
  }
}
