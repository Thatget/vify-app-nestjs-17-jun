import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {UpdateProductDto} from "./dto/update-product.dto";
import {CreateProductDto} from "./dto/create-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) {}
    async create(createProductDto: CreateProductDto) {
        const Product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(Product);
    }

    findAll():Promise<Product[]> {
        return this.productRepository.find();
    }

    findOne(id: string):Promise<Product | null> {
        return this.productRepository.findOneBy({id});
    }

     update(id: string, updateProductDto: UpdateProductDto) {
        const Product = this.findOne(id)
        return this.productRepository.update(id,updateProductDto)
    }
    async delete(id: string):Promise<void> {
        await this.productRepository.delete(id);
    }
}
