import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`users`)
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: `varchar` })
  name: string;
}
