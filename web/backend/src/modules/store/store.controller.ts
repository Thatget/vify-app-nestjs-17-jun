import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Res} from '@nestjs/common';
import {StoreService} from './store.service';
import {CreateStoreDto} from './dto/create-store.dto';
import {UpdateStoreDto} from './dto/update-store.dto';
import {Request, Response} from "express";
import {Product} from "../product/entities/product.entity";
import fetchProducts from "../product/helpers/products";
import {Store} from "./entities/store.entity";

@Controller('/api/store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {
    }

    @Post()
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Get()
    async getStoreInfor(@Req() req: Request, @Res() res: Response): Promise<Store[]> {
        try {
            let status = 200;
            const storeSession = res.locals.shopify.session
            return storeSession
        } catch (e) {
            console.log(e)
        }
    }

    @Get()
    findAll() {
        return this.storeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.storeService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storeService.update(+id, updateStoreDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.storeService.remove(+id);
    }
}
