import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject , Res, Req, Redirect } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { Session, Shopify } from '@shopify/shopify-api';
import shopify from '../helpers/shopify';

@Controller('api/auth')
export class AuthController {
  constructor(@Inject(StoreService) private readonly storeService: StoreService) {}
  @Get()
  getStoreBegin() {
    console.log("Authen api")
  }
  @Get('callback')
  async getStoreCallBack(@Req() req: Request, @Query() query, @Res() res) {
    try {
      const { session } =  res.locals.shopify;
      if (session.isOnline) {
        // await this.handleOnlineCallback(req, res, session)
      } else {
        await this.storeService.createOrUpdate({...session,id: null, shop: query.shop })
      }
      shopify.redirectToShopifyOrAppRoot;
    } catch (e) {
      res.status(500).send((<Error>e).message)
    }
  }
}
