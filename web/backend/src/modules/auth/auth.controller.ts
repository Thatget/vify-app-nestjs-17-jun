import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import shopify from '../../utils/shopify';

@Controller('api/auth')
export class AuthController {
  constructor(@Inject(StoreService) private readonly storeService: StoreService) {}
  @Get()
  getStoreBegin() {
    console.log("Quyet da qua buoc begin")
  }
  @Get('callback')
  async getStoreCallBack(@Query() query) {
    // await this.storeService.create({shop: query.shop})
    console.log(query)
    // shopify.redirectToShopifyOrAppRoot()
    return "fff";
  }
}
