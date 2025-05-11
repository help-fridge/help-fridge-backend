import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from 'src/auth/common/guards/auth.guard';
import { User } from 'src/common/decorator/user.decorator';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * 소비기한 임박한 것 기준으로 레시피 추천
   */
  @UseGuards(AuthGuard)
  @Get('/match')
  async getRecipeMatchStats(@User('idx') userIdx: number) {
    return await this.recipeService.getRecipeMatchStats(userIdx);
  }
}
