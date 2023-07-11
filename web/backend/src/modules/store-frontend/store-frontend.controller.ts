import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { query } from 'express';
import { StoreFrontendService } from './store-frontend.service';
import { QuoteEntityService } from '../quote_entity/quote_entity.service';

@Controller('api/proxy')
export class StoreFrontendController {
  constructor(
    private readonly storeFrontendService: StoreFrontendService,
    private readonly quoteEntityService: QuoteEntityService
    ) {}

  @Post('new_quote')
  create(@Body() createStoreFrontendDto) {
    return this.storeFrontendService.create(createStoreFrontendDto);
  }

  @Get('quote_setting')
  async findSetting (@Param() params, @Query() query, @Req() req: Request, @Res() res: Response) {
    try {
      console.log("query", query)
      console.log("params", params)
      console.log("request", res)
      this.quoteEntityService.findByShop("shop");

      return {show: true}
    } catch(e) {
      console.log("Api/proxy", e.message)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeFrontendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreFrontendDto) {
    return this.storeFrontendService.update(+id, updateStoreFrontendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeFrontendService.remove(+id);
  }
}
