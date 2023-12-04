import { KitchenStudio } from '#/kitchen_studio/entities/kitchen_studio.entity';
import { Training_theme } from '#/training_theme/entities/training_theme.entity';
import { Users_cyc } from '#/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum statusRegular {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}
@Entity()
export class RegularClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:"varchar"
  })
  courseName: string;

  @Column({
    type:"date"
  })
  startDate: Date;

  @Column({
    type:"date"
  })
  endDate: Date;

  @Column({
    type:"bigint"
  })
  price: number;

  @Column({
    type: "bigint"
  })
  adminFee: number;

  @Column({
    type:"bigint"
  })
  numberOfBenches: number;

  @Column({
    type:"text"
  })
  description: string;

  @Column({
    type: 'enum',
    enum: statusRegular,
    default: statusRegular.PENDING,
  })
  status: string;

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

  @ManyToOne(() => Training_theme, (theme) => theme.regular)
  theme: Training_theme;

  @ManyToOne(() => KitchenStudio, (kitchen) => kitchen.regular)
  kitchen: KitchenStudio;
}
