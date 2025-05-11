import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeRepository } from './recipe.repository';

@Module({
  imports: [AuthModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
