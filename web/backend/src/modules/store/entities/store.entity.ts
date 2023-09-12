import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Quote } from '../../quote/entities/quote.entity';
import { QuoteEntity } from '../../quote_entity/entities/quote_entity.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  shop: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  accessToken: string;
  @Column({ nullable: true })
  ianaTimezone: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ nullable: true })
  role: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
  @OneToMany(() => Quote, (quote) => quote.store, { cascade: true })
  quotes: Quote[];
  @OneToMany(() => QuoteEntity, (quote_entity) => quote_entity.store, {
    cascade: true,
  })
  quote_entities: QuoteEntity[];
  @OneToMany(() => Product, (product) => product.store, { cascade: true })
  products: Product[];
}
