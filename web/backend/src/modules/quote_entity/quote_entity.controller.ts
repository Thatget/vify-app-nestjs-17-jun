import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import {QuoteEntityService} from './quote_entity.service';
import {QuoteEntityDto} from './dto/quote_entity.dto';
import {Request, Response} from 'express';
import {StoreService} from '../store/store.service';


@Controller('api/quote-entity')
export class QuoteEntityController {
    constructor(
        private readonly quoteEntityService: QuoteEntityService,
        private readonly storeService: StoreService,
        @Inject('DefaultQuoteEntity') private defaultQuoteEntity: string[]
    ) {
    }

    @Post()
    async create(@Body() quoteEntities: QuoteEntityDto[], @Res() res: Response) {
        try {
            const {shop} = res.locals.shopify.session;
            if (shop) {
                const foundStore = await this.storeService.findByShopDomain(shop);
                // Filter allowed quote entities
                // let value;
                const passedQuoteEntities = quoteEntities
                    // .filter((entity) => this.defaultQuoteEntity.includes(entity.name))
                    .map((entity) => (
                        {
                            ...entity, store_id: foundStore.id, id: null
                        }
                    ));
                await this.quoteEntityService.createUpdateEntity(passedQuoteEntities);
                return res
                    .status(HttpStatus.OK)
                    .json({message: 'Data updated successfully'});
            }
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({message: 'Missing store name'});
            // return response
        } catch (error) {
            console.log(error);
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message: 'An error occurred'});
        }
    }

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const {shop} = res.locals.shopify.session;
            if (shop) {
                const foundStore = await this.storeService.findByShopDomain(shop);
                const settings = await this.quoteEntityService.findByStore(foundStore);
                return res.status(HttpStatus.OK).json(settings);
            }
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({message: 'Missing store name'});
        } catch (error) {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message: 'An error occurred'});
        }
    }
}
