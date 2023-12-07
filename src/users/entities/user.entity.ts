import { Bank } from "#/bank/entities/bank.entity";
import { KitchenStudio } from "#/kitchen_studio/entities/kitchen_studio.entity";
import { LevelUsers } from "#/level-users/entities/level-users.entity";
import { Notifikasi } from "#/notifikasi/entities/notifikasi.entity";
import { PrivateClass } from "#/private-class/entities/private-class.entity";
import { RegularClass } from "#/regular-class/entities/regular-class.entity";
import { UsersPayment } from "#/users-payment/entities/users-payment.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum gender{
    PRIA = 'Pria',
    WANITA = 'Wanita'

}
export enum statusUser{
    ACTIVE = 'active',
    INCATIVE = 'inactive',
    PENDING = 'pending'
}
@Entity()
export class Users_cyc{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:"varchar", length:100})
    name: string;

    @Column({type:"varchar", length:255})
    email: string;

    @Column()
    salt: string;

    @Column({type:"varchar", length:100})
    password: string;

    @Column({type: 'date', nullable: true})
    dateOfBirth: Date;

    @Column({type:"enum", enum:gender, nullable:true})
    gender: gender;

    @Column({type: "varchar", length:15, nullable:true})
    phoneNumber: string;

    @Column({type: "text", nullable:true})
    photo: string;

    @Column({type: "text", nullable:true})
    address: string;

    @Column({
        type:"enum", 
        enum:statusUser,
        default: statusUser.PENDING
    })
    status: statusUser;

    @CreateDateColumn({
        type: "timestamp with time zone",
        nullable: false
    })
    createdAt: Date

    @UpdateDateColumn({
        type:"timestamp with time zone",
        nullable: false
    })
    updatedAt: Date

    @DeleteDateColumn({
        type:"timestamp with time zone",
        nullable: true
    })
    deletedAt: Date

    @ManyToOne(()=> LevelUsers, (level) => level.user)
    level:LevelUsers;

    @OneToMany(() => PrivateClass, (priv) => priv.trainee)
    priv:PrivateClass

    @OneToMany(() => Bank, (bank) => bank.users)
    bank: Bank;

    @OneToMany(() => UsersPayment, (usersPay) => usersPay.users)
    usersPay: UsersPayment;

    @OneToMany(() => Notifikasi, (notif1) => notif1.receiver)
    notif1: Notifikasi;

    @OneToMany(() => Notifikasi, (notif2) => notif2.sender)
    notif2: Notifikasi;

}