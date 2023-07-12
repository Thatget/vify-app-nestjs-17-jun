import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Product} from "../../product/entities/product.entity";
import { Quote } from '../../quote/entities/quote.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  shop: string;
  @Column()
  name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  accessToken: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  role: string
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
  @OneToMany(() => Quote, quote => quote.store)
  quotes: Quote[];
  @OneToMany(() => Product, (product) => product.store)
  products: Product[]
}
