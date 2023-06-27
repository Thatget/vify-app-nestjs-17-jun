import { Store } from '../../store/entities/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FormTemplate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  template: number;
  @Column()
  name: string
  @Column()
  email: string
  @Column()
  message: string
  @OneToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  user: Store;
}
