import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { ResponseQuoteDto } from './dto/quote-response.dto';

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

  async findAll(store_id: number, skip: number, take: number) {
    return await this.quoteRepository.findAndCount({
      where: { store_id },
      skip,
      take,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }

  async updateStatus(id: number, store_id: number, status: number) {
    const quote = await this.quoteRepository.findOneBy({ id });
    if (quote.store_id !== undefined) {
      console.log('quote.store_id', quote.store_id);
    }
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
    console.log(id, store_id);
    return this.quoteRepository
      .createQueryBuilder()
      .delete()
      .from(Quote)
      .where({ id, store_id })
      .execute();
  }

  async searchQuote(searchText: string, store_id: number,  skip: number, take: number): Promise<ResponseQuoteDto[]> {
    return await this.quoteRepository
      .createQueryBuilder()
      .where('name LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('email LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('MATCH(product)  AGAINST(:searchText IN NATURAL LANGUAGE MODE)', { searchText })
      .andWhere({store_id})
      .offset(skip)
      .limit(take)
      .getManyAndCount()
  }
}
