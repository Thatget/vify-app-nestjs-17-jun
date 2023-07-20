import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {StoreService} from '../store/store.service';

import fetchProducts from '../helpers/products';
import {Request, Response} from 'express';
import {Product} from './entities/product.entity';

@Controller('api/products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly storeService: StoreService,
    ) {
    }

    @Get()
    async getAllProducts(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            const status = 200;
            // const products = await fetchProducts(res.locals.shopify.session);
            const products = await this.productService.findAll();
            return res.status(200).send(products);
        } catch (e) {
          return res.status(500).send({message: 'Failed when get products'});
        }
    }

    @Post('/insert')
    async insert(@Req() req: Request, @Res() res: Response) {
        let rawData: CreateProductDto;
        const shopDomain = res.locals.shopify.session.shop;
        const foundStore = await this.storeService.findByShopDomain(shopDomain);
        await req.body.map(async (result: any) => {
            const found = await this.productService.findOne(result.id);
            if (found !== true) {
                rawData = {
                    id: result.id,
                    productId: result.id,
                    title: result.title || '',
                    productDescription: result.descriptionHtml,
                    store_id: foundStore.id,
                    imageURL: result.imageURL || null,
                    variants: JSON.stringify(result.variants) || '',
                };
                await this.productService.insert(rawData);
            }
        });
      return res.status(200).send("OK");
    }
}
