import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { QuoteEntityService } from './quote_entity.service';
import { QuoteEntityDto } from './dto/quote_entity.dto';
import {Request, Response} from "express";

const allowedAttribute = [ 'name', 'hide_price', 'hide_add_to_cart' ];
@Controller('api/quote-entity')
export class QuoteEntityController {
  constructor(private readonly quoteEntityService: QuoteEntityService) {}

  @Post()
  async create(@Body() quoteEntities: QuoteEntityDto[], @Res() res: Response) {
    try {
      const { shop } = res.locals.shopify.session;
      if (shop) {
        // Filter allowed quote entities
        const passedQuoteEntities = quoteEntities.filter((entity) => (allowedAttribute.includes(entity.name)))
          .map(entity => ({ ...entity, shop: shop }));
        // Update or Save
				await this.quoteEntityService.createUpdateEntity(passedQuoteEntities);
        return '';
			}
      res.status(HttpStatus.BAD_REQUEST);
      return {message: "Missing store name"};
    } catch (error) { 
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll( @Res() res: Response) {
    try {
      const { shop } = res.locals.shopify.session;
      if (shop) {
        return await this.quoteEntityService.findByShop(shop);
      }
    } catch (error) {
      
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quoteEntityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() quoteEntityDto: QuoteEntityDto) {
    return this.quoteEntityService.update(+id, quoteEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteEntityService.remove(+id);
  }
}
