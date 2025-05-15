import { PartialType } from '@nestjs/swagger';
import { CreateFridgeInput } from 'src/api/fridge/input-v2/create-fridge.input';

export class UpdateFridgeInput extends PartialType(CreateFridgeInput) {}
