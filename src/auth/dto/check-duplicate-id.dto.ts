import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Regex } from '../common/constants/regex.constant';

export class checkDuplicateId {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @Matches(Regex.ID)
  id: string;
}
