import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
  HttpException,
  Inject,
} from '@nestjs/common';
import { QuoteEntityService } from '../quote_entity/quote_entity.service';
import { StoreFrontendService } from './store-frontend.service';
import { StoreService } from '../store/store.service';
import { QuoteService } from '../quote/quote.service';
import { CreateQuoteDto } from '../quote/dto/create-quote.dto';
import { ProductService } from '../product/product.service';

@Controller('api/proxy')
export class StoreFrontendController {
  constructor(
    private readonly storeServer: StoreService,
    private readonly storeFrontendService: StoreFrontendService,
    private readonly quoteEntityService: QuoteEntityService,
    private readonly quoteService: QuoteService,
    private readonly productService: ProductService,
    @Inject('DefaultQuoteEntity') private defaultQuoteEntity: string[],
  ) {}

  @Post('new_quote')
  async create(@Body() quote: CreateQuoteDto) {
    try {
      const { product_id } = quote;
      const product = await this.productService.findOne(product_id);
      // const store_id = product.store.id;
      // if (!store_id) {
        // return {}
      // }
      // quote = {...quote, store_id}
      return this.quoteService.create(quote);
    } catch (error) {
      console.log(error.message)
      return error;
    }
  }

  @Get('quote_setting')
  async findSetting(
    @Param() params,
    @Query() query,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let show = true;
    try {
      const { shop, product_id } = query.shop;
      const store = await this.storeServer.findByShopDomain(shop);
      if (!store || !this.storeFrontendService.verifySignature(query)) {
        throw new HttpException('Failed to authenticate', 401);
      }
      const store_id = store.id;
      const settings = await this.quoteEntityService.findByStoreId(store_id, this.defaultQuoteEntity);
      this.defaultQuoteEntity.forEach(entity => {
        switch (entity) {
          case 'all_product':
            settings.map(setting => {
              if (setting.name === 'all_product') {
                if (setting.value) {
                  show = true;
                } else show = false;
              }
            })
            break;
          default:
            break;
        }
      })
      if (!show) {
        
      }
      return { show: true };
    } catch (e) {
      return { show};
      throw new HttpException('Failed to authenticate', 500);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.storeFrontendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreFrontendDto) {
    // return this.storeFrontendService.update(+id, updateStoreFrontendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.storeFrontendService.remove(+id);
  }
}
