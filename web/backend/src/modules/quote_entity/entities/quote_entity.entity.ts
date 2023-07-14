import { Store } from '../../store/entities/store.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Index,
  ManyToOne,
} from 'typeorm';

@Entity()
// @Index(['name'], { unique: true })
export class QuoteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: null })
  label: string;
  @Column('text', { default: null })
  value: string;
  @Column()
  store_id: number;
  @ManyToOne(() => Store, (store) => store.quote_entities)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
