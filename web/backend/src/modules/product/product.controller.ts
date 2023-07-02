import {Body, Controller, Delete, Get, Param, Patch, Post, Req, Res} from '@nestjs/common';
import {StoreService} from "../store/store.service";
import {CreateStoreDto} from "../store/dto/create-store.dto";
import {UpdateStoreDto} from "../store/dto/update-store.dto";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import fetchProducts from "./products";
import {Request, Response} from "express";

@Controller('api/products')

export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(@Req() req: Request,@Res() res: Response) {
        try{
            let status = 200;
            const products = await fetchProducts(res.locals.shopify.session);
            return this.productService.findAll()
        }
        catch (e){
            console.log(e)
        }
    }
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.delete(id);
    }
}
