import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './common/module/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FridgeModule } from './api/fridge/fridge.module';
import { RecipeModule } from './api/recipe/recipe.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FridgeModule,
    RecipeModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
