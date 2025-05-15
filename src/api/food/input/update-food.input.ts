import { PartialType } from '@nestjs/swagger';
import { CreateFoodInput } from 'src/api/food/input/create-food.input';

export class UpdateFoodInput extends PartialType(CreateFoodInput) {}
