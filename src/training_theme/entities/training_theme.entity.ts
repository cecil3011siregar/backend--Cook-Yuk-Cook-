import { Material } from '#/material/entities/material.entity';
import { PrivateClass } from '#/private-class/entities/private-class.entity';
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
  ManyToOne,
} from 'typeorm';

@Entity()
export class Training_theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @OneToMany(() => Reviews, (review) => review.trainee)
  //   reviews: Reviews;

  @ManyToOne(() => RegularClass, (regular) => regular.theme)
  regular: RegularClass;

  @ManyToOne(() => PrivateClass, (priv) => priv.theme)
  priv: PrivateClass;

  @ManyToOne(() => Material, (material) => material.theme)
  material: Material

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'text',
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
