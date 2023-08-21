import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { QuoteEntityService } from '../quote_entity/quote_entity.service';
import { StoreFrontendService } from './store-frontend.service';
import { StoreService } from '../store/store.service';
import { QuoteService } from '../quote/quote.service';
import { CreateQuoteDto } from '../quote/dto/create-quote.dto';
import { ProductService } from '../product/product.service';
import { CreateProductDto } from '../product/dto/create-product.dto';

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
      const store = await this.storeService.findByShopDomain(shop);
      if (!store || !this.storeFrontendService.verifySignature(query)) {
        return res.status(401).json({ message: 'Failed to authenticate' });
      }
      const formValue = data.formValue;
      const selected_variant = data.selected_variant;

      const selected_product = data.selected_product;
      const product = { selected_product, selected_variant };
      const product_string = JSON.stringify(product);
      if (store) {
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
  @Get('product_setting')
  async getAllProducts(@Query() query, @Res() res: Response) {
    let products: CreateProductDto;
    console.log('query', query);
    console.log('query.product_id', query.produt_id);
    try {
      const product_id: string = query.product_id;
      console.log('query.product_id', quey.product_id);
      const shop = query.shop;
      const store = await this.storeService.findByShopDomain(shop);
      if (!store || !this.storeFrontendService.verifySignature(query)) {
        return res.status(401).json({ message: 'Failed to authenticate' });
      }
      const store_id = store.id;
      const quoteEntities = await this.quoteEntityService.findByStore_Id(
        store_id,
      );
      this.defaultQuoteEntity.forEach(async (entity) => {
        let entityValue = null;
        const quoteEntity = quoteEntities.find(
          (quoteEntity) => quoteEntity.name === entity,
        );
        if (quoteEntity) {
          entityValue = quoteEntity.value;
        }
        switch (entity) {
          case 'all_product':
            if (entityValue && entityValue === '0') {
              products = null;
              break;
            } else {
              products = await this.productService.findByProductId(product_id);
              break;
            }
          default:
            break;
        }
      });
      return res.status(200).send(products);
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Fail to get Products List from Setting' });
    }
  }

  @Get('quote_setting')
  async findSetting(@Query() query, @Res() res: Response) {
    let show = true;
    console.log("come quote setting");
    
    const settings: { name: string; value: string }[] = [];
    try {
      const shop = query.shop;
      const store = await this.storeService.findByShopDomain(shop);
      if (!store || !this.storeFrontendService.verifySignature(query)) {
        return res.status(401).json({ message: 'Failed to authenticate' });
      }
      const store_id = store.id;
      const quoteEntities = await this.quoteEntityService.findByStore_Id(
        store_id,
      );
      this.defaultQuoteEntity.forEach((entity) => {
        let entityValue = null;
        const quoteEntity = quoteEntities.find(
          (quoteEntity) => quoteEntity.name === entity,
        );
        if (quoteEntity) {
          entityValue = quoteEntity.value;
        }
        switch (entity) {
          case 'all_product':
            if (entityValue && entityValue === '0') {
              show = false;
            } else show = true;
            break;
          default:
            settings.push({ name: entity, value: entityValue });
            break;
        }
      });
      return res.status(200).send({ show, settings });
    } catch (e) {
      return res.status(500).send({ message: 'Fail to get setting' });
    }
  }
}
