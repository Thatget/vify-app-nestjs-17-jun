import {Body, Controller, Delete, Get, Param, Patch, Post, Req, Res} from '@nestjs/common';
import {StoreService} from "../store/store.service";
import {CreateStoreDto} from "../store/dto/create-store.dto";
import {UpdateStoreDto} from "../store/dto/update-store.dto";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import fetchProducts from "./helpers/products";
import {shopifyApi} from "@shopify/shopify-api";
import {ShopifyModule} from "../../shopify/shopify.module";
import {ShopifyService} from "../../shopify/shopify.service";
import {raw, Request, Response} from "express";
import {Product} from "./entities/product.entity";
import {InsertResult} from "typeorm/query-builder/result/InsertResult";

@Controller('api/products')

export class ProductController {

    constructor(private readonly productService: ProductService, private readonly shopifyService: ShopifyService) {
    }

    @Get()
    async getAllProducts(@Req() req: Request, @Res() res: Response): Promise<Product[]> {
        try {
            let status = 200;
            // const products = await fetchProducts(res.locals.shopify.session);
            // console.log(products)
            return this.productService.findAll()
        } catch (e) {
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

    @Post('/insert')
    async insert(@Req() req: Request, @Res() res: Response): Promise<void> {
        console.log("insert API 1")
        console.log("Body data ",req.body)
        let rawData: Product
        const shopDomain = res.locals.shopify.session.shop
        req.body.map(async (result: any) => {
            let found = await this.productService.findOne(result.id)
            if (found !== true) {
                rawData = {
                    id:result.id,
                    productId: result.id,
                    productDescription: result.descriptionHtml,
                    productTitle: result.title,
                    imageURL: result.images[0].originalSrc || null,
                    shopDomain: shopDomain
                }
                await this.productService.insert(rawData)
            }
        })
    }
}
