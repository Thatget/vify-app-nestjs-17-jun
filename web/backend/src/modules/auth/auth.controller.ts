import {
  Controller,
  Get,
  Query,
  Inject,
  Res,
  Req,
} from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { Session, Shopify } from '@shopify/shopify-api';
import { ShopifyService } from '../shopify/shopify.service';
import { Response } from 'express';
import { StoreDto } from '../store/dto/store.dto';
import { WebhookService } from '../webhook/webhook.service';
import { WEBHOOK_TOPIC, WebhookSubscriptionFormat } from '../../types/webhook';
import { ConfigService } from '@nestjs/config'
import { logger } from '../helpers/logger.helper';
import ShopInfo from '../../types/ShopInfo';

@Controller('api/auth')
export class AuthController {
  shopify: Shopify;
  constructor(
    @Inject(StoreService) private readonly storeService: StoreService,
    private readonly shopifyService: ShopifyService,
    private readonly webhookService: WebhookService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async redirect(@Req() req: Request, @Res() res: Response) {
    const embeddedAppUrl =
      await this.shopifyService.shopify.api.auth.getEmbeddedAppUrl({
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
        const shopInfo: ShopInfo = await this.storeService.getShopInfo(session)
        const storeInfo: StoreDto = {
          name: shopInfo.name,
          shop: shopInfo.myshopifyDomain,
          email: shopInfo.email,
          ianaTimezone: shopInfo.ianaTimezone,
        }
        await this.storeService.createOrUpdate( storeInfo, session.accessToken);
        try {
        const uninstallEndpoint = this.configService.get<string>('app.host') + '/api/webhooks'
        await this.webhookService.createWebhook(session, {
          topic: WEBHOOK_TOPIC.APP_UNINSTALLED,
          input: {
              callbackUrl: uninstallEndpoint,
              format: WebhookSubscriptionFormat.JSON
          }
        })
        } catch (error) {
          logger.error(error.message);
        }
      }
      const embeddedAppUrl =
        await this.shopifyService.shopify.api.auth.getEmbeddedAppUrl({
          rawRequest: req,
          rawResponse: res,
        });
      return res.redirect(embeddedAppUrl);
    } catch (e) {
      res.status(500).send((<Error>e).message);
    }
  }
}
