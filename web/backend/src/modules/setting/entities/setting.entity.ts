import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Store } from './../../store/entities/store.entity';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'boolean', default: false })
  hide_price: boolean;
  @Column({ type: 'boolean', default: false })
  hide_add_to_cart: boolean;
  @Column({ type: 'boolean', default: false })
  hide_buy_now: boolean;
  @Column({ type: 'boolean', default: false })
  hide_request_a_quote: boolean;
  @Column()
  form_number: number;
  @Column({ unique: true })
  shop: string;
  @OneToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store_id: Store;
}
