import { Controller, Post, Body, Req } from '@nestjs/common';
import { log } from 'console';
import { Request } from 'express';

@Controller('/api/webhooks')
export class WebhookController {
    constructor() {
    }

  @Post()
  uninstalledHandle(@Body() body: any) {
    try {
      log("Quyet webhook ! post")
    // const shopDomain = req.header('x-shopify-shop-domain') as string
    // log("shopDomain api/webhooks: ", shopDomain)
    } catch(e) {
      log(" quyet webhooks api uninstall !")
      // log(e.message)
    }
  }
}
