import {Store} from '../../store/entities/store.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['name', 'store_id'])
export class QuoteEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column('text', {default: null})
    value: string;
    @Column({nullable: false})
    store_id: number;
    @ManyToOne(() => Store, (store) => store.quote_entities)
    @JoinColumn({name: 'store_id'})
    store: Store;
}
