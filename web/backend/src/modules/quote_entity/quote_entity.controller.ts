import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import {QuoteEntityService} from './quote_entity.service';
import {QuoteEntityDto} from './dto/quote_entity.dto';
import {Request, Response} from 'express';
import {Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Store} from '../store/entities/store.entity';
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
                    .filter((entity) => this.defaultQuoteEntity.includes(entity.name))
                    .map((entity) => (

                        // if (entity.value.toString() === "true") {
                        //     value = "true"
                        // }
                        // if (entity.value.toString() === "false") {
                        //     value = "false"
                        // }
                        // // {...entity, store_id: foundStore.id}
                        // return (
                        {
                            ...entity, store_id: foundStore.id, id: null
                        }
                        // )

                    ));
                // Update or Save
                // console.log('passedQuoteEntities before changing', passedQuoteEntities);


                // passedQuoteEntities.map(result => {
                //     if (result.value.toString() === "true") {
                //         result.value = "true"
                //     } else if (result.value.toString() === "false") {
                //         result.value = "false"
                //     }
                // })
                console.log('passedQuoteEntities', passedQuoteEntities);

                await this.quoteEntityService.createUpdateEntity(passedQuoteEntities);
                // console.log("respond from Quote_entiy", res)
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

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.quoteEntityService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() quoteEntityDto: QuoteEntityDto) {
    //     return this.quoteEntityService.update(+id, quoteEntityDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.quoteEntityService.remove(+id);
    // }
}
