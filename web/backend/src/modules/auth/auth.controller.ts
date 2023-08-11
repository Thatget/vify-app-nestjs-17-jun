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
  Req,
  Redirect,
} from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { Session, Shopify } from '@shopify/shopify-api';
import { ShopifyService } from '../shopify/shopify.service';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  shopify: Shopify;

  constructor(
    @Inject(StoreService) private readonly storeService: StoreService,
    private readonly shopifyService: ShopifyService,
  ) {}

  @Get()
  async redirect(@Req() req: Request, @Res() res: Response) {
    const embeddedAppUrl =
      await this.shopifyService.shopify.auth.getEmbeddedAppUrl({
        rawRequest: req,
        rawResponse: res,
      });
    return res.redirect(embeddedAppUrl);
  }

  @Get('callback')
  async getStoreCallBack(
    @Req() req: Request,
    @Query() query,
    @Res() res: Response,
  ) {
    try {
      const { session } = res.locals.shopify;
      if (session.isOnline) {
        // await this.handleOnlineCallback(req, res, session)
      } else {
        await this.storeService.createOrUpdate({
          ...session,
          id: null,
          shop: query.shop,
        });
      }
      const embeddedAppUrl =
        await this.shopifyService.shopify.auth.getEmbeddedAppUrl({
          rawRequest: req,
          rawResponse: res,
        });
      return res.redirect(embeddedAppUrl);
    } catch (e) {
      res.status(500).send((<Error>e).message);
    }
  }
}
