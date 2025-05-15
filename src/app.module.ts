import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './common/module/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FridgeModule } from './api/fridge/fridge.module';
import { RecipeModule } from './api/recipe/recipe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FoodModule } from './api/food/food.module';
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'help-fridge-frontend', 'dist'),
      exclude: ['api'],
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FridgeModule,
    RecipeModule,
    FoodModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
