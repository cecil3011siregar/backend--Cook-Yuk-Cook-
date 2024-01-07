import { Bank } from "#/bank/entities/bank.entity";
import { KitchenStudio } from "#/kitchen_studio/entities/kitchen_studio.entity";
import { LevelUsers } from "#/level-users/entities/level-users.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum gender{
    PRIA = 'Pria',
    WANITA = 'Wanita'

}
export enum statusUser{
    ACTIVE = 'active',
    INCATIVE = 'inactive',
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

    @Column({type: 'date'})
    dateOfBirth: Date;

    @Column({type:"enum", enum:gender})
    gender: gender;

    @Column({type: "varchar", length:15})
    phoneNumber: string;

    @Column({type: "text"})
    photo: string;

    @Column({type: "text"})
    address: string;

    @Column({
        type:"enum", 
        enum:statusUser,
        default: statusUser.INCATIVE
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

    @OneToMany(() => Bank, (bank) => bank.users)
    bank: Bank;


}