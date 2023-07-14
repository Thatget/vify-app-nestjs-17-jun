import { Inject, Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
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

  async insert(product: Product): Promise<InsertResult> {
    return await this.productRepository.insert(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    const Product = this.findOne(id);
    return this.productRepository.update(id, updateProductDto);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
