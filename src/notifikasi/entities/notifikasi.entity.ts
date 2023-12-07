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

export enum statusNotif{
    READ = 'read',
    UNREAD = 'unread'
}
@Entity()
export class Notifikasi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users_cyc, (receiver)=> receiver.notif1)
  receiver: Users_cyc;

  @ManyToOne(() => Users_cyc, (sender) => sender.notif2)
  sender:Users_cyc;

  @Column({type:"varchar", length: 50})
  title: string;

  @Column({type: "text"})
  message: string;

  @Column({
    type: "enum",
    enum: statusNotif,
    default: statusNotif.UNREAD
  })
  status: statusNotif;

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
}
