import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Res} from '@nestjs/common';
import {StoreService} from './store.service';
import {CreateStoreDto} from './dto/create-store.dto';
import {UpdateStoreDto} from './dto/update-store.dto';
import {Request, Response} from "express";
import {Product} from "../product/entities/product.entity";
import fetchProducts from "../helpers/products";
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
    findAll() {
        return this.storeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return this.storeService.fin(+id);
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
