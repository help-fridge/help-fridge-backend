import { Query } from '@nestjs/common';
import { ValidateStorageTypePipe } from '../pipes/validate-fridge.type.pipe';

/**
 * 저장공간 타입 파라미터를 검증하는 데코레이터
 */
export function Type() {
  return Query('type', ValidateStorageTypePipe);
}
