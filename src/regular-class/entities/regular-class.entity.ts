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

export enum statusRegular {
  APPROVE = 'approve',
  REJECT = 'reject',
  PENDING = 'pending',
}
@Entity()
export class RegularClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:"varchar",
    length: 255
  })
  courseName: string;

  @Column({
    type:"timestamp"
  })
  startDate: Date;

  @Column({
    type:"timestamp"
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
    type:"int"
  })
  numberOfBenches: number;

  @Column({
    type:"text"
  })
  description: string;

  @Column({
    type: 'enum',
    enum: statusRegular,
    default: statusRegular.APPROVE,
  })
  status: statusRegular;

  @Column({type:"varchar", nullable: true})
  alasan: string

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

  @OneToMany(() => UsersPayment, (usersPay) => usersPay.regular)
  usersPay: UsersPayment;

  @OneToMany(() => Material, (material) => material.regular)
  material:Material;

  @ManyToOne(() => Users_cyc, (users) => users.regular)
  users: Users_cyc;

}
