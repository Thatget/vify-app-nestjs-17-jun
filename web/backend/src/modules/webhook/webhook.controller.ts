import { Controller, Post, Req, Res, UseGuards, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import shopify from '../helpers/shopify';
import { WebhookGuard } from './webhook.guard';
import { IncomingMessage } from 'http';
import { StoreService } from '../store/store.service';
import { logger } from '../helpers/logger.helper';

@Controller(shopify.config.webhooks.path)
@UseGuards(WebhookGuard)
export class WebhookController {
    constructor(
      private readonly storeService: StoreService
    ) {
    }

  @Post()
  async processWebhook(
    @Req() req: Request<IncomingMessage>,
    @Res() res: Response,
  ) {
    const topic = req.headers['x-shopify-topic'] as string;

    if (!req.body) {
      throw new InternalServerErrorException(
        'raw body not found',
      );
    }

    const domain = req.headers['x-shopify-shop-domain'] as string;
    if (!domain || !topic) {
      throw new BadRequestException(
        `something went wrong`,
      );
    }

    const graphqlTopic = topic.toUpperCase().replace(/\//g, '_');
    switch (graphqlTopic) {
      case 'APP_UNINSTALLED':
        await this.uninstall(domain);
        break;
      default:
        break;
    }
    res.status(200).send('completed');
  }

  private async uninstall(shop: string) {
    try {
      this.storeService.deleteByShopDomain(shop)
    } catch (error) {
      logger.error(error.message);
    }
  }
}
