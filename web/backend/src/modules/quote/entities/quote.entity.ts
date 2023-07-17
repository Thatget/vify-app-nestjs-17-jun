import {Store} from '../../store/entities/store.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable: true})
  name: string;
  @Column({nullable: true})
  email: string;
  @Column({nullable: true})
  message: string;
  @Column({nullable: true})
  product_id: string;
  @Column('tinyint', {default: 0})
  status: number;
  @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  created_at: Date;
  @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  updated_at: Date;
  @Column({ nullable: false })
  store_id: number;
  @ManyToOne(() => Store, store => store.quotes)
  @JoinColumn({name: 'store_id'})
  store: Store;
}
