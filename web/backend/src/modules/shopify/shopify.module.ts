import { Global, Module } from '@nestjs/common'
import { ShopifyService } from './shopify.service'

@Global()
@Module({
    imports: [],
    providers: [ShopifyService],
    exports: [ShopifyService]
})
export class ShopifyModule {}
