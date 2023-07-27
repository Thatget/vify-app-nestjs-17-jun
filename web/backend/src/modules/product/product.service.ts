import { Inject, Injectable } from '@nestjs/common';
import { In, InsertResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async insertAll(products: Product[]): Promise<InsertResult> {
    return await this.productRepository.insert(products);
  }

  async create(product: CreateProductDto): Promise<InsertResult> {
    return await this.productRepository.insert(product);
  }

  async insert(product: CreateProductDto): Promise<InsertResult> {
    return await this.productRepository.insert(product);
  }

  async findAll(store_id: number): Promise<Product[]> {
    return await this.productRepository.findBy({store_id});
  }

  async findByProductIds(productIds:string[]) {
    return await this.productRepository.findBy({ productId: In(productIds) });
  }

  async findOne(id: string): Promise<boolean> {
    let found = false;
    await this.productRepository
      .findOne({ where: { productId: id } })
      .then((r) => {
        if (r !== null) {
          found = true;
        }
      });
    return found;
  }

  async findByProductId(product_id: string) {
    const product = await this.productRepository.findOneBy({productId: product_id});
    return product;
  }
  async selectedPiecked(store_id: number): Promise<Product[]> {
    const products = await this.productRepository.createQueryBuilder('product')
      .select(['product.productId', 'product.variants'])
      .where('product.store_id = :store_id', { store_id })
      .getMany();
      return products;
  }
}
