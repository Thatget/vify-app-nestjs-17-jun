import { Store } from '../../store/entities/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class QuoteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  shop: string;
  @Column()
  name: string;
  @Column()
  lable: string;
	@Column('text')
  value: string;
  @OneToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  user: Store;
}
