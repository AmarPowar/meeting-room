/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Room {
  
  @PrimaryColumn()
  id: number;

  @Column({ default: 0, nullable: true })
  capacity: number;

  @Column({ default: 0, nullable: true })
  pairIntroTime: number;

  @Column({ default: 0, nullable: true })
  totalPairIntroTime: number;

  @Column('jsonb', { default: [] })
  peopleList: { name: string; photo: string }[];

}
