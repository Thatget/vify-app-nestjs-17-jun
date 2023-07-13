import {Body, Controller, Delete, Get, Param, Patch, Post, Req, Res} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";

import fetchProducts from "./helpers/products";
import {raw, Request, Response} from "express";
import {Product} from "./entities/product.entity";
import { StoreService } from '../store/store.service';


@Controller('api/products')

export class ProductController {

    constructor(
      private readonly productService: ProductService,
      private readonly storeService: StoreService,
    )
       {}

    @Get()
    async getAllProducts(@Req() req: Request, @Res() res: Response): Promise<Product[]> {
        try {
          let status = 200;
          // const products = await fetchProducts(res.locals.shopify.session);
          return this.productService.findAll()
        } catch (e) {
          console.log(e)
        }
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Post('/insert')
    async insert(@Req() req: Request, @Res() res: Response): Promise<void> {
        let rawData: Object
        const shopDomain = res.locals.shopify.session.shop;
        const store = 
        req.body.map(async (result: any) => {
            let found = await this.productService.findOne(result.id)
            if (found) {
                rawData = {
                  id:result.id,
                  productId: result.id,
                  productDescription: result.descriptionHtml,
                  productTitle: result.title,
                  imageURL: result.images[0].originalSrc || null,
                  store_id: 1,
                }
                await this.productService.insert(rawData)
            }
        })
    }
}
