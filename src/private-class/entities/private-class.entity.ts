import { KitchenStudio } from '#/kitchen_studio/entities/kitchen_studio.entity';
import { Material } from '#/material/entities/material.entity';
import { Training_theme } from '#/training_theme/entities/training_theme.entity';
import { UsersPayment } from '#/users-payment/entities/users-payment.entity';
import { Users_cyc } from '#/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum statusPrivate {
  APPROVE = 'approve',
  REJECT = 'reject',
  PENDING = 'pending',
}
@Entity()
export class PrivateClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"date"})
  startDate: Date;

  @Column({type:"date"})
  endDate: Date;

  @Column({
    type: 'enum',
    enum: statusPrivate,
    default: statusPrivate.PENDING,
  })
  status: statusPrivate;

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

  @ManyToOne(() => Users_cyc, (trainee) => trainee.priv)
  trainee:Users_cyc;

  @OneToMany(() => UsersPayment, (usersPay) => usersPay.privclass)
  usersPay: UsersPayment;

  @OneToMany(() => Material, (material) => material.priv)
  material: Material;
}
