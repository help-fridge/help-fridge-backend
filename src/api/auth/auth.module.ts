import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { LoginTokenService } from './services/login-token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './common/guards/auth.guard';
import { UserModule } from 'src/api/user/user.module';
import { LocalAccountModule } from 'src/api/account/local-account.module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    UserModule,
    LocalAccountModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginTokenService, AuthGuard],
  exports: [AuthService, LoginTokenService],
})
export class AuthModule {}
