import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @Inject('QUOTE_REPOSITORY')
    private quoteRepository: Repository<Quote>,
  ) {}

  create(createQuoteDto: CreateQuoteDto) {
    return this.quoteRepository.insert(createQuoteDto);
  }

  async findByStore(store_id: number) {
    return await this.quoteRepository.findBy({ store_id });
  }

  async findAll(store_id: number, skip: number, take: number, since?: Date, until?: Date) {
    const whereCondition:any = {
      store_id,
    }
    if (since && until)  whereCondition.created_at = Between(since, until)
    else if (since) whereCondition.created_at = MoreThan(since)
    else if (until) whereCondition.created_at = LessThan(until)
    return await this.quoteRepository.findAndCount({
      where: whereCondition,
      skip,
      take,
      order: { created_at: "DESC" }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }

  async updateStatus(id: number, store_id: number, status: number) {
    const quote = await this.quoteRepository.findOneBy({ id });
    if (quote && quote.store_id && quote.store_id === store_id) {
      quote.status = status;
      return await this.quoteRepository.save(quote);
    } else throw new NotFoundException(`Store and quote id ${id} is mismatch`);
  }

  async delete(ids: number[], store_id: number) {
    return this.quoteRepository
      .createQueryBuilder()
      .delete()
      .from(Quote)
      .where('id IN (:...ids) AND store_id = :store_id', { ids, store_id })
      .execute();
  }

  async deleteEach(id: number, store_id: number) {
    return this.quoteRepository
      .createQueryBuilder()
      .delete()
      .from(Quote)
      .where({ id, store_id })
      .execute();
  }

  async searchQuote(textSearch: string, store_id: number,  skip: number, take: number, since?: Date, until?: Date) {
    const whereCondition:any = {
      store_id,
    }
    if (since && until)  whereCondition.created_at = Between(since, until)
    else if (since) whereCondition.created_at = MoreThan(since)
    else if (until) whereCondition.created_at = LessThan(until)
    return await this.quoteRepository
      .createQueryBuilder()
      .where(
        'name LIKE :textSearch OR email LIKE :textSearch OR MATCH(product) AGAINST(:textSearchProduct IN NATURAL LANGUAGE MODE)',
        { textSearch: `%${textSearch}%`,textSearchProduct: textSearch }
        )
      .andWhere( whereCondition )
      .offset(skip)
      .limit(take)
      .orderBy("created_at", "DESC")
      .getManyAndCount()
  }
}
