import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { checkDuplicateId } from './dto/check-duplicate-id.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/check-duplicate')
  async checkDuplicateId(@Body() checkDuplicateId: checkDuplicateId) {
    return await this.authService.checkDuplicateId(checkDuplicateId.id);
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup({
      id: signupDto.id,
      pw: signupDto.pw,
      nickname: signupDto.nickname,
    });
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.login({
      id: loginDto.id,
      pw: loginDto.pw,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    const mainPageUrl = this.configService.get<string>('MAIN_PAGE_URL') || '/';

    return res.redirect(mainPageUrl);
  }
}
