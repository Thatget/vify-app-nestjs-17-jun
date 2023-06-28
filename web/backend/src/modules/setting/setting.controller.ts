import { Controller, Get, Post, Body, Patch, Param, Res, Req, HttpStatus } from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import {Request, Response} from "express";

@Controller('api/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  async create(@Body() createSettingDto: CreateSettingDto, @Res() res: Response) {
    try {
      const { shop } = res.locals.shopify.session;
      if (shop) {
        const data = {...createSettingDto, shop}
        await this.settingService.createOrUpdate(data);
        res.status(HttpStatus.OK);
        return res.send({message: "updated"});
      }
      res.status(HttpStatus.BAD_REQUEST);
      return {message: "Missing store name"};
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST);
      return res.send({message: error.message});
    }
  }

  @Get()
  async findOne(@Req() req: Request, @Res() res: Response) {
    try {
      const { shop } = res.locals.shopify.session;
      if (shop) {
        const setting = await this.settingService.findByShop(shop);
        return res.send(setting);
      }
      return {}
    } catch (error) {
      return res.json({message: error.message});
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(+id, updateSettingDto);
  }

}
