import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { Regex } from '../common/constants/regex.constant';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @Matches(Regex.ID)
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(Regex.PW)
  pw: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 6)
  @Matches(Regex.NICKNAME)
  nickname: string;
}
