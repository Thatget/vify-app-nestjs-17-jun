import {Module} from '@nestjs/common';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {DatabaseModule} from "../database/database.module";
import {productProviders} from "./product.providers";
import {StoreService} from "../store/store.service";
import {StoreModule} from "../store/store.module";

@Module({
    imports: [DatabaseModule, StoreModule],
    controllers: [ProductController],
    providers: [...productProviders, ProductService],
    exports: [ProductService]
})
export class ProductModule {
}
