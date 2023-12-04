import { RegularClass } from '#/regular-class/entities/regular-class.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Training_theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

//   @OneToMany(() => Reviews, (review) => review.trainee)
//   reviews: Reviews;

  @OneToMany(() => RegularClass, (regular) => regular.theme)
  regular:RegularClass;
  
  @Column({type:"varchar", length:255})
  name: string;

  @Column({
    type:"text"
  })
  chef_name: string;
  @Column()
  price: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;

  @VersionColumn()
  version: number;
}
