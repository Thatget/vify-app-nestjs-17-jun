import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res, HttpException } from '@nestjs/common';
import { QuoteEntityService } from '../quote_entity/quote_entity.service';
import { StoreFrontendService } from './store-frontend.service';
import { StoreService } from '../store/store.service';

@Controller('api/proxy')
export class StoreFrontendController {
  constructor(
    private readonly storeServer: StoreService,
    private readonly storeFrontendService: StoreFrontendService,
    private readonly quoteEntityService: QuoteEntityService,
    ) {}

  @Post('new_quote')
  create(@Body() createStoreFrontendDto) {
    // return this.storeFrontendService.create(createStoreFrontendDto);
  }

  @Get('quote_setting')
  async findSetting (@Param() params, @Query() query, @Req() req: Request, @Res() res: Response) {
    try {
      const shopDomain = query.shop;
      const store = await this.storeServer.findByShopDomain(query.shop);
      if (!store || !this.storeFrontendService.verifySignature(query)) {
        throw new HttpException('Failed to authenticate', 401)
      }
      const setting = await this.quoteEntityService.findByShop(shopDomain);
      console.log(setting);
      return {show: true}
    } catch(e) {
      throw new HttpException('Failed to authenticate', 500)
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
