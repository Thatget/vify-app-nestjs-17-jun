import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import shopify from 'src/utils/shopify';
import { StoreService } from '../store/store.service';

@Controller('api/auth')
export class AuthController {
  @Get()
  getStoreBegin() {
    console.log("Quyet da qua buoc begin")
  }
  @Get('callback')
  getStoreCallBack(@Query() query, @Body() body) {
    StoreService
    console.log(query)
  }
}
