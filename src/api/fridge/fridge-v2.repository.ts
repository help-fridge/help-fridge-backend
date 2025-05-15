import { Injectable } from '@nestjs/common';
import { FridgeV2Service } from 'src/api/fridge/fridge-v2.service';

@Injectable()
export class FridgeV2Repository {
  constructor(private readonly fridgeService: FridgeV2Service) {}
}
