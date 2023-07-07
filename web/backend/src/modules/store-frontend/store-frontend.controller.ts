import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreFrontendService } from './store-frontend.service';

@Controller('api/proxy')
export class StoreFrontendController {
  constructor(private readonly storeFrontendService: StoreFrontendService) {}

  @Post('new_quote')
  create(@Body() createStoreFrontendDto) {
    return this.storeFrontendService.create(createStoreFrontendDto);
  }

  @Get('quote_setting')
  findAll() {
    return this.storeFrontendService.findAll();
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
