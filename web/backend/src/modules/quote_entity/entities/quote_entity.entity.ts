import { Store } from '../../store/entities/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, Index } from 'typeorm';

@Entity()
@Index(['name', 'shop'], { unique: true })
export class QuoteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  shop: string;
  @Column()
  name: string;
  @Column({ default: null })
  label: string;
	@Column('text', { default: null })
  value: string;
  @OneToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  user: Store;
}
