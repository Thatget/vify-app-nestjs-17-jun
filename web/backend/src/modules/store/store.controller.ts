import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { StoreService } from './store.service';
import { StoreDto } from './dto/store.dto';

@Controller('/api/store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {
  }

  @Get()
  async storeInfo(@Res() res: Response) {
    try {
      const session = res.locals.shopify.session
      const store = await this.storeService
      .getShopInfo(session)
      return res.status(200).send({data: store})
    } catch (error) {
      return res.status(500).json()
    }
  }
  @Post()
  create(@Body() createStoreDto: StoreDto) {
    // return this.storeService.createOrUpdate(createStoreDto);
  }
}
