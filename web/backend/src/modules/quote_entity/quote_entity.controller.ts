import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { QuoteEntityService } from './quote_entity.service';
import { CreateQuoteEntityDto } from './dto/create-quote_entity.dto';
import { UpdateQuoteEntityDto } from './dto/update-quote_entity.dto';
import {Request, Response} from "express";


@Controller('api/quote-entity')
export class QuoteEntityController {
  constructor(private readonly quoteEntityService: QuoteEntityService) {}

  @Post()
  async create(@Body() createQuoteEntityDto: CreateQuoteEntityDto, @Res() res: Response) {
    try {
      const { shop } = res.locals.shopify.session;
      if (shop) {}
      res.status(HttpStatus.BAD_REQUEST);
      return {message: "Missing store name"};
    } catch (error) {
      
    }
    return this.quoteEntityService.create(createQuoteEntityDto);
  }

  @Get()
  findAll() {
    return this.quoteEntityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quoteEntityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteEntityDto: UpdateQuoteEntityDto) {
    return this.quoteEntityService.update(+id, updateQuoteEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteEntityService.remove(+id);
  }
}
