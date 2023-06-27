import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormTemplate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column('tinyint')
  status: number;
}
