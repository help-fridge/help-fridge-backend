import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupInput } from '../input/signup.input';
import { LoginInput } from '../input/login.input';
import { UserRepository } from 'src/api/user/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginTokenService } from './login-token.service';

@Injectable()
export class AuthService {
  private readonly REFRESH_TOKEN_STORE: Record<number, string> = {};

  constructor(
    private readonly userRepository: UserRepository,
    private readonly loginTokenService: LoginTokenService,
  ) {}

  /**
   * refresh token 메모리에 저장
   */
  public saveRefreshToken(userIdx: number, refreshToken: string): void {
    this.REFRESH_TOKEN_STORE[userIdx] = refreshToken;
  }

  /**
   * refresh token 조회
   */
  public getRefreshToken(userIdx: number): string | null {
    return this.REFRESH_TOKEN_STORE[userIdx] || null;
  }

  /**
   * 회원가입
   */
  async signup(signupInput: SignupInput) {
    const user = await this.userRepository.selectUserById(signupInput.id);
    if (user) {
      throw new ConflictException('이미 존재하는 Id 입니다.');
    }

    const hashedPw = await bcrypt.hash(signupInput.pw, 10);

    return await this.userRepository.createUser({
      id: signupInput.id,
      pw: hashedPw,
      nickname: signupInput.nickname,
    });
  }

  /**
   * 로그인
   */
  async login(loginInput: LoginInput): Promise<TokenPair> {
    const user = await this.userRepository.selectUserById(loginInput.id);
    if (!user) {
      throw new UnauthorizedException('존재하지 않은 사용자압니다.');
    }

    const isMatch = await bcrypt.compare(loginInput.pw, user.pw);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { idx: user.idx };
    const jwtAccessToken =
      await this.loginTokenService.signAccessToken(payload);
    const jwtRefreshToken =
      await this.loginTokenService.signRefreshToken(payload);

    this.saveRefreshToken(user.idx, jwtRefreshToken);

    return { accessToken: jwtAccessToken, refreshToken: jwtRefreshToken };
  }

  /**
   * refresh token 검증 후 새로운 access token 발급
   */
  async regenerateAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<{ newAccessToken: string; payload: RefreshTokenPayload }> {
    const payload =
      await this.loginTokenService.verifyRefreshToken(refreshToken);

    if (
      !this.getRefreshToken(payload.idx) ||
      this.getRefreshToken(payload.idx) !== refreshToken
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      newAccessToken: await this.loginTokenService.signAccessToken(payload),
      payload,
    };
  }
}
