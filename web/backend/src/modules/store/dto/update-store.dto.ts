import { PartialType } from '@nestjs/mapped-types';
import { StoreDto } from './store.dto';

export class UpdateStoreDto extends PartialType(StoreDto) {}
