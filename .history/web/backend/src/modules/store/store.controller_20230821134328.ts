import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDto } from './dto/store.dto';

@Controller('/api/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: StoreDto) {
    // return this.storeService.createOrUpdate(createStoreDto);
  }
}
