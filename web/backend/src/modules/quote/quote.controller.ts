import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { QuoteService } from './quote.service';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { StoreService } from '../store/store.service';

@Controller('api/quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly storeService: StoreService,
  ) {}

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const shopDomain = res.locals.shopify.session.shop;
      const foundStore = await this.storeService.findByShopDomain(shopDomain);
      const store_id = foundStore.id;
      const quotes = await this.quoteService.findByStore(store_id);
      return res.status(200).send({quotes});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteService.remove(+id);
  }
  @Delete('/delete')
  async deleteMultipleRows(@Body() ids: number[]) {
    // const result = await this.quoteService.remove({ id: In(ids) });
    // return result;
  }
}
