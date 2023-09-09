import ProductInQuote from 'src/types/ProductInQuote';
import { Store } from '../../store/entities/store.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  message: string;
  @Index({ fulltext: true })
  @Column('json', { nullable: false })
  product: ProductInQuote;
  @Column('tinyint', { default: 0 })
  status: number;
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
  @Column({ nullable: false })
  store_id: number;
  @ManyToOne(() => Store, (store) => store.quotes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
