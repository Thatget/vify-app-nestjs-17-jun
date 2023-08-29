import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Post,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { QuoteService } from './quote.service';
import { StoreService } from '../store/store.service';
import { logger } from '../helpers/logger.helper';

interface Sort {
  sortBy: string;
  sortType: 'DESC'|'ASC'
}

interface searchOption {
  textSearch?: string;
  since?: Date;
  until?: Date;
}

@Controller('api/quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly storeService: StoreService,
  ) {}

  @Get()
  async findAndPaging(
    @Query('textSearch') textSearch: string,
    @Query('skip') skip: number,
    @Query('since') since: string,
    @Query('until') until: string,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: 'DESC'| 'ASC',
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      let [quotes, count] = [[], 0];
      const shopDomain = res.locals.shopify.session.shop;
      const foundStore = await this.storeService.findByShopDomain(shopDomain);
      const store_id = foundStore.id;

      const sort: Sort = {sortBy, sortType}
      const options:searchOption = {}
      if (since) options.since = new Date(since);
      if (until) {
        const endDate = new Date(until);
        endDate.setHours(endDate.getHours() + 24)
        options.until = endDate

      }
      if (textSearch) options.textSearch = textSearch;
      [quotes, count] = await this.quoteService
          .searchQuote(store_id, skip, 5, sort, options )
  
      return res.status(200).send({ quotes, count });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quoteService.findOne(+id);
  }

  @Post('/delete')
  async delete(
    @Req() req: Request,
    @Body() ids: number[],
    @Res() res: Response,
  ) {
    try {
      const { shop } = res.locals.shopify.session;
      const foundStore = await this.storeService.findByShopDomain(shop);
      const store_id = foundStore.id;
      await this.quoteService.delete(ids, store_id);
      return res.status(200).send('OK');
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  @Post('/deleteEach')
  async deleteEach(
    @Req() req: Request,
    @Body('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const { shop } = res.locals.shopify.session;
      const foundStore = await this.storeService.findByShopDomain(shop);
      const store_id = foundStore.id;
      await this.quoteService.deleteEach(id, store_id);
      return res.status(200).send('OK');
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  //Update status only
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('status') status: number,
    @Res() res: Response,
  ) {
    try {
      const shopDomain = res.locals.shopify.session.shop;
      const foundStore = await this.storeService.findByShopDomain(shopDomain);
      const store_id = foundStore.id;
      await this.quoteService.updateStatus(id, store_id, status);
      return res.status(200).send('OK');
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.quoteService.remove(+id);
  }
}
