import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
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
import ProductResponse, { ProductVariant } from '../../types/ProductResponse';

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
          const { shop } = res.locals.shopify.session;
          const foundStore = await this.storeService.findByShopDomain(shop);
            const products = await this.productService.findAll(foundStore.id);
            return res.status(200).send(products);
        } catch (e) {
          console.log(e.message);
          return res.status(500).send({message: 'Failed when get products'});
        }
    }

    @Get('/select')
    async storeProduct(
      @Query() query,
      @Res() res: Response,
    ) {
        try {
          const list: ProductResponse[] = [];
          let { title, page } = query;
          if (!title) title = '';
          if (!page) page = 0;
          const shopProducts = await fetchProducts(res.locals.shopify.session, title, page);
          const shopProductIds = shopProducts.map(product => product.id);
          const products = await this.productService.findByProductIds(shopProductIds) || [];
          if (shopProducts) {
            shopProducts.forEach(shopProduct => {
              const subList: ProductResponse = {
                id: shopProduct.id,
                title: shopProduct.title,
                image: shopProduct.image,
                variants: [],
              };
              let matchedProduct = products.find((product) => product.productId === shopProduct.id);
              const variants: ProductVariant[] = [];
              shopProduct.variants.map((shopVariant: ProductVariant) => {
                let selected = false;
                if (matchedProduct) {
                  const matchedVariant = JSON.parse(matchedProduct.variants) || [];
                  if (matchedVariant.find((variant: ProductVariant) => variant.id === shopVariant.id)) selected = true;
                }
                const variant: ProductVariant = {
                  id: shopVariant.id,
                  title: shopVariant.title,
                  price: shopVariant.price,
                  selected
                }
                variants.push(variant);
                subList.variants = variants;
              })
              list.push(subList);
            })
          }
          return res.status(200).send(list);
        } catch (e) {
          console.log(e.message);
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
