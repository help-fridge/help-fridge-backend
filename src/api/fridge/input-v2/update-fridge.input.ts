import { PartialType, PickType } from '@nestjs/swagger';
import { CreateFridgeInput } from 'src/api/fridge/input-v2/create-fridge.input';

export class UpdateFridgeInput extends PartialType(
  PickType(CreateFridgeInput, ['storage', 'unitIdx', 'expiredAt'] as const),
) {}
