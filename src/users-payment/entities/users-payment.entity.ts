import { Bank } from "#/bank/entities/bank.entity";
import { PrivateClass } from "#/private-class/entities/private-class.entity";
import { RegularClass } from "#/regular-class/entities/regular-class.entity";
import { Users_cyc } from "#/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum type{
    REGCLASS = 'regular class',
    PRIVCLASS = 'private class',
    CLASSPROP = 'class proposal',
}

export enum statusPay{
    PENDING = 'pending',
    APPROVE = 'approve',
    REJECT = 'reject',
    DONEPAID = 'done paid'
}

@Entity()
export class UsersPayment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "date",
    })
    date: Date;

    @Column({
        type: "enum",
        enum: type
    })
    type: type;

    @Column({
        type: "bigint",
    })
    price: number

    @Column({
        type: "bigint",
    })
    totalPayment: number;

    @Column({
        type:"varchar",
        unique: true,
        length: 8,
        nullable: true
    })
    uniqueCode: string;

    @Column({
        type:"text",
        nullable: true
    })
    photoProof : string;

    @Column({
        type: "enum",
        enum: statusPay,
        default: statusPay.PENDING
    })
    status: statusPay;

    @Column({type: "varchar", nullable:true})
    alasan: string;
    
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

    @ManyToOne(() => Users_cyc, (users) => users.usersPay)
    users: Users_cyc;
    @ManyToOne(() => Bank, (bank) => bank.usersPay)
    bank: Bank;
    @ManyToOne(() => RegularClass, (regular) => regular.usersPay)
    regular: RegularClass;
    @ManyToOne(() => PrivateClass, (privclass) => privclass.usersPay)
    privclass: PrivateClass;

}