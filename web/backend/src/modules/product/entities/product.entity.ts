import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Store} from "../../store/entities/store.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    productId: string;

    @Column()
    productDescription: string;

    @Column()
    productTitle: string;

    @Column()
    imageURL: string

    @ManyToOne(() => Store, store => store.products)
    @JoinColumn({ name: 'store_id' })
    store: Store;
}