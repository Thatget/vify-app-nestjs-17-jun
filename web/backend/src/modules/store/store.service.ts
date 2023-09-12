import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';
import { Store } from './entities/store.entity';
import { ShopifyService } from '../shopify/shopify.service';
import { GraphqlQueryError, Session } from '@shopify/shopify-api';
import ShopInfo from 'src/types/ShopInfo';
import { GET_SHOP } from '../../graphql/query/shop/get_shop.graphql';

interface QueryResponse {
  data: {
    shop: ShopInfo;
  };
}

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private readonly storesRepository: Repository<Store>,
    private readonly shopifyService: ShopifyService,
  ) {}

  async createOrUpdate(
    storeDto: StoreDto,
    accessToken: string,
  ): Promise<StoreDto> {
    const store = await this.storesRepository.findOneBy({
      shop: storeDto.shop,
    });
    if (store) {
      Object.assign(store, storeDto, accessToken);
      await this.storesRepository.save(store);
    } else await this.storesRepository.save({ ...storeDto, accessToken });
    return store;
  }

  async findByShopDomain(shop: string): Promise<Store> {
    if (shop) {
      return await this.storesRepository.findOneBy({ shop: shop });
    } else {
      return null;
    }
  }
  async deleteByShopDomain(shop: string): Promise<void> {
    await this.storesRepository.delete({ shop });
  }

  public async getShopInfo(session: Session): Promise<ShopInfo> {
    const client = new this.shopifyService.shopify.api.clients.Graphql({
      session,
    });
    try {
      const { body } = await client.query<QueryResponse>({
        data: {
          query: GET_SHOP,
        },
      });
      const { shop } = body.data;
      const shopInfo: ShopInfo = {
        name: shop.name,
        myshopifyDomain: shop.myshopifyDomain,
        email: shop.email,
        ianaTimezone: shop.ianaTimezone,
      };
      return shopInfo;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`,
        );
      } else {
        throw error;
      }
    }
  }
}
