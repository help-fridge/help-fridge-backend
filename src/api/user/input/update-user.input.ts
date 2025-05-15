import { PartialType } from '@nestjs/swagger';
import { CreateUserInput } from 'src/api/user/input/create-user.input';

export class UpdateUserInput extends PartialType(CreateUserInput) {}
