import { Controller, Get, Post, Body, Patch, Param, Res, Req } from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import {Request, Response} from "express";

@Controller('api/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @Get()
  async findOne(@Req() req: Request, @Res() res: Response) {
    try {
      const shop = res.locals.shopify.session;
      if (shop) {
        const setting = await this.settingService.findByShop(shop);
        return res.send(setting);
      }
    } catch (error) {
      return res.json({message: error.message});
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(+id, updateSettingDto);
  }

}
