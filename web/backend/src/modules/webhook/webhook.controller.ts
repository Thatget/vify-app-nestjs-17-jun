import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('/api/store')
export class WebhookController {
    constructor() {
    }

  @Post()
  create(@Body() createStoreDto) {
    // return this.storeService.createOrUpdate(createStoreDto);
  }
}
