import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFridgeStorageDto {
  @IsString()
  @IsNotEmpty()
  storage: string;
}
