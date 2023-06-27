import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {DatabaseModule} from "../database/database.module";
import {productProviders} from "./product.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders,ProductService],
  exports: [ProductService]
})
export class ProductModule {}
