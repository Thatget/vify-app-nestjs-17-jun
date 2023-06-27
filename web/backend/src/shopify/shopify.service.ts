import {Injectable, Req, Res} from '@nestjs/common';
import '@shopify/shopify-api/adapters/node';
import {ConfigParams, LATEST_API_VERSION, shopifyApi} from "@shopify/shopify-api";
import {restResources} from "@shopify/shopify-api/rest/admin/2023-04";
import {Request, Response} from "express";

const config_Params : ConfigParams = {
    apiKey: '96b7bc915138d6e851c55cf27839bdec',
    apiSecretKey: 'a130d9b430bc45d58485bb0df9b9ec09',
    scopes: ["write_products"],
    hostName: "quick-start-a9fd4568.myshopify.com",
    isCustomStoreApp: true,
    hostScheme: 'https',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false,
    restResources: restResources
}

@Injectable()
export class ShopifyService {

    getSessionShopify(@Req() req : Request, @Res({passthrough: true}) res: Response){
        return shopifyApi(config_Params).auth.callback({
            rawRequest: req,
            rawResponse: res
        })

    }
}
