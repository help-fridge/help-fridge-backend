import { PartialType, PickType } from '@nestjs/swagger';
import { CreateFridgeDto } from 'src/api/fridge/dto-v2/create-fridge.dto';

export class UpdateFridgeDto extends PartialType(
  PickType(CreateFridgeDto, ['storage', 'amount', 'unitIdx', 'expiredAt']),
) {}
