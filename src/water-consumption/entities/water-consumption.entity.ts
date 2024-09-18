import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaterConsumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('float')
  amount: number;

  @Column()
  date: Date;
}
