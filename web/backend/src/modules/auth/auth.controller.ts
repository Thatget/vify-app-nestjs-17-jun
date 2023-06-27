import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject , Res } from '@nestjs/common';
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
  async getStoreCallBack(@Query() query, @Res() res) {
    await this.storeService.create({shop: query.shop})
    return res.redirect(`https://${query.shop}/admin`);
  }
}
