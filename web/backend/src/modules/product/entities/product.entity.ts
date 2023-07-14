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
  imageURL: string;
  // @Column()
  // shopDomain: string

  // @ManyToOne(() => Store, (store) => store.products)
  // @JoinColumn({ name: 'id' })
  // store: Store;
  @ManyToOne(() => Store, (store) => store.products) store: Store;
}
