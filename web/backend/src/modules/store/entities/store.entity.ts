import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  shop: string;
  @Column({ default: true })
  isActive: boolean;
}
