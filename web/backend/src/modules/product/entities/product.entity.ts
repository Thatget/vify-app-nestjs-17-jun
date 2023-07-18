import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../../store/entities/store.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  productDescription: string;

  @Column()
  productTitle: string;

  @Column()
  imageURL: string

  @Column({ nullable: false })
  store_id: number;
  @ManyToOne(() => Store, store => store.products)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
