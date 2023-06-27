import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"

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


}