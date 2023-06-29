import { PartialType } from '@nestjs/mapped-types';
import { CreateQuoteEntityDto } from './create-quote_entity.dto';

export class UpdateQuoteEntityDto extends PartialType(CreateQuoteEntityDto) {}
