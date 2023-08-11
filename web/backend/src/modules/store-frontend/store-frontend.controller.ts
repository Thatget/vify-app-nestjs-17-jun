import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Res,
  Req,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { QuoteEntityService } from '../quote_entity/quote_entity.service';
import { StoreFrontendService } from './store-frontend.service';
import { StoreService } from '../store/store.service';
import { QuoteService } from '../quote/quote.service';
import { CreateQuoteDto } from '../quote/dto/create-quote.dto';
import { ProductService } from '../product/product.service';

@Controller('api/proxy')
export class StoreFrontendController {
  constructor(
    private readonly storeService: StoreService,
    private readonly storeFrontendService: StoreFrontendService,
    private readonly quoteEntityService: QuoteEntityService,
    private readonly quoteService: QuoteService,
    private readonly productService: ProductService,
    @Inject('DefaultQuoteEntity') private defaultQuoteEntity: string[],
  ) {}

  @Post('new_quote')
  async create(@Body() data, @Query() query, @Res() res: Response) {
    try {
      const shop = query.shop;
      const formValue = data.formValue;
      const selected_variant = data.selected_variant;

      const selected_product = data.selected_product;
      const product = { selected_product, selected_variant };
      const product_string = JSON.stringify(product);
      const store = await this.storeService.findByShopDomain(shop);
      if (store) {
        const store_id = store.id;
        const quote: CreateQuoteDto = {
          ...formValue,
          product: product_string,
          store_id: store.id,
        };
        await this.quoteService.create(quote);
        return res.status(200).send({ message: 'OK' });
      }
      return res.status(403).json({ message: 'Shop not found!' });
    } catch (error) {
      return res.status(500).send({ message: 'faild to save quote' });
    }
  }

  @Get('quote_setting')
  async findSetting(@Query() query, @Res() res: Response) {
    let show = true;
    let settings = [];
    try {
      const shop = query.shop;
      const variant_selected_id = query.variant_selected_id;
      const store = await this.storeService.findByShopDomain(shop);
      if (!store || !this.storeFrontendService.verifySignature(query)) {
        throw new HttpException('Failed to authenticate', 401);
      }
      const store_id = store.id;
      // const settings = await this.quoteEntityService.findByStoreId(store_id, this.defaultQuoteEntity);
      settings = await this.quoteEntityService.findByStore_Id(store_id);
      // console.log("Data settings from store", settings)
      this.defaultQuoteEntity.forEach((entity) => {
        switch (entity) {
          case 'all_product':
            settings.map((setting) => {
              if (setting.name === 'all_product') {
                if (setting.value) {
                  show = true;
                } else show = false;
              }
            });
            break;
          default:
            show = false;
            // console.log("show 1.9", show)
            break;
        }
      });

      if (!show) {
        const products = await this.productService.findByStoreId(store_id);
        const variant_selected_id_string = `gid://shopify/Product/${variant_selected_id}`;
        console.log(
          'variant_selected_id_string store-frontEnd.Controller',
          variant_selected_id,
        );

        products.map((product) => {
          if (product.variants.includes(variant_selected_id)) {
            show = true;
            console.log('show store-frontEnd.Controller', show);
            return res.status(200).send({ show, settings });
          }
        });
        return res.status(200).send({ show, settings });
      }
      // return res.status(200).send({show, settings});
    } catch (e) {
      //has a problem here??
      return res.status(200).send({ show: false, settings });
    }
  }
}
