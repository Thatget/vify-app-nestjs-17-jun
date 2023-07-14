import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
  Res,
} from '@nestjs/common';
import { StoreService } from '../store/store.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject(StoreService) private readonly storeService: StoreService,
  ) {}

  @Get()
  getStoreBegin() {
    console.log('Authen api');
  }

  @Get('callback')
  async getStoreCallBack(@Query() query, @Res() res) {
    await this.storeService.create({ shop: query.shop });
    return res.redirect(`https://${query.shop}/admin`);
  }
}
