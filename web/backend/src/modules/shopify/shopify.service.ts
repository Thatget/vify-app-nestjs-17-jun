import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LATEST_API_VERSION, Session, Shopify, shopifyApi, ApiVersion } from '@shopify/shopify-api'
import { Request, Response } from 'express'

@Injectable()
export class ShopifyService {
  shopify: Shopify
  
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.shopify = shopifyApi({
      apiKey: this.configService.get('shopify.api_key'),
      apiSecretKey: this.configService.get('shopify.api_secret'),
      scopes: this.configService.get('shopify.scopes').replace(/\s/g, '').split(','),
      hostName: this.configService.get('app.host').replace(/https?:\/\//, ''),
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: true,
    })
  }
}
