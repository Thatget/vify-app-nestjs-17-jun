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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { StoreService } from '../store/store.service';
import { Request, Response } from 'express';
import ProductResponse, { ProductVariant } from '../../types/ProductResponse';
import ProductSelect from 'src/types/ProductSelect';

@Controller('api/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
  ) {}

  @Get()
  async getAllProducts(
    @Query('page') page: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { shop } = res.locals.shopify.session;
      // console.log('shop api products', shop);

      const foundStore = await this.storeService.findByShopDomain(shop);
      // console.log('foundStore', foundStore);

      const [products, count] = await this.productService.findAll(
        foundStore.id,
        page * 10,
        10,
      );
      const test = await this.productService.findByStoreId(foundStore.id);
      // console.log('test', test);

      // console.log('finished', { products, count });
      return res.status(200).send({ products, count });
    } catch (e) {
      return res.status(500).send({ message: 'Failed when get products' });
    }
  }

  @Get('/select')
  async storeProduct(@Query() query, @Res() res: Response) {
    try {
      const list: ProductResponse[] = [];
      let { title, reverse } = query;
      if (!title) title = '';
      const session = res.locals.shopify.session;
      if (!(reverse === true)) reverse = false;
      // const productPage = await fetchProducts(session, title, reverse);
      const productPage = {
        productList: [],
        pageInfo: {},
      };
      const shopProducts = productPage.productList;
      const pageInfo = productPage.pageInfo;
      const shopProductIds = shopProducts.map((product) => product.id);
      const products =
        (await this.productService.findByProductIds(shopProductIds)) || [];
      if (shopProducts) {
        shopProducts.forEach((shopProduct) => {
          const subList: ProductResponse = {
            id: shopProduct.id,
            title: shopProduct.title,
            image: shopProduct.image,
            variants: [],
          };
          const matchedProduct = products.find(
            (product) => product.id === shopProduct.id,
          );
          const variants: ProductVariant[] = [];
          shopProduct.variants.map((shopVariant: ProductVariant) => {
            let selected = false;
            if (matchedProduct) {
              const matchedVariant = JSON.parse(matchedProduct.variants) || [];
              if (
                matchedVariant.find(
                  (variant: ProductVariant) => variant.id === shopVariant.id,
                )
              )
                selected = true;
            }
            const variant: ProductVariant = {
              id: shopVariant.id,
              title: shopVariant.title,
              price: shopVariant.price,
              selected,
            };
            variants.push(variant);
            subList.variants = variants;
          });
          list.push(subList);
        });
      }
      return res.status(200).send({ products: list, pageInfo });
    } catch (e) {
      return res.status(500).send({ message: 'Failed when get products' });
    }
  }

  @Post('/insert')
  async insert(@Req() req: Request, @Res() res: Response) {
    const rawData: CreateProductDto[] = [];
    const shopDomain = res.locals.shopify.session.shop;
    const foundStore = await this.storeService.findByShopDomain(shopDomain);
    console.log('foundStore api insert', foundStore);
    console.log('req.body', req.body);
    req.body.map(async (result) => {
      const temp = {
        id: result.id,
        title: result.title || '',
        productDescription: result.descriptionHtml,
        store_id: foundStore.id,
        imageURL: result.imageURL || null,
        variants: JSON.stringify(result.variants) || '',
      };
      console.log(temp);
      rawData.push(temp);

      // const found = await this.productService.findOne(result.id);
      // const product = await this.productService.findByProductId(result.id);
      // if (found !== true) {
      //   if (product !== undefined) {
      //     JSON.parse(product.variants)
      //       .find((element) => element.id !== result.id)
      //       .then(async (rel) => {
      //         rawData = {
      //           id: rel.id,
      //           title: rel.title || '',
      //           productDescription: rel.descriptionHtml,
      //           store_id: foundStore.id,
      //           imageURL: rel.imageURL || null,
      //           variants: JSON.stringify(rel.variants) || '',
      //         };
      //         await this.productService.insert(rawData);
      //       });
      //   }
      // } else {
      //   rawData = {
      //     id: result.id,
      //     title: result.title || '',
      //     productDescription: result.descriptionHtml,
      //     store_id: foundStore.id,
      //     imageURL: result.imageURL || null,
      //     variants: JSON.stringify(result.variants) || '',
      //   };
      //   await this.productService.insert(rawData);
      // }
    });
    await this.productService.upsert(rawData);
    return res.status(200).send('OK');
  }

  @Get('/product_picked')
  async getpicked(@Res() res: Response) {
    try {
      const { shop } = res.locals.shopify.session;
      const selectedProducts: ProductSelect[] = [];
      const foundStore = await this.storeService.findByShopDomain(shop);
      const products = await this.productService.selectedPiecked(foundStore.id);
      products.forEach((product) => {
        selectedProducts.push({
          id: product.id,
          variants: JSON.parse(product.variants) || [],
        });
      });
      return res.status(200).send(selectedProducts);
    } catch (e) {
      return res.status(500).send({ message: 'Failed when get products' });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      const { shop } = res.locals.shopify.session;
      const foundStore = await this.storeService.findByShopDomain(shop);
      await this.productService.delete(id, foundStore.id);
      return res.status(200).send('OK');
    } catch (e) {
      return res.status(500).send({ message: 'Failed when get products' });
    }
  }

  @Post('/delete')
  async delete(@Body() ids: number[], @Res() res: Response) {
    try {
      console.log(typeof ids[0]);
      console.log('delete ids', ids);
      const shopDomain = res.locals.shopify.session.shop;
      const foundStore = await this.storeService.findByShopDomain(shopDomain);
      if (foundStore) {
        const store_id = foundStore.id;
        await this.productService.deleteMany(ids, store_id);
      }
      return res.status(200).send('OK');
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
}
