import { KitchenStudio } from "#/kitchen_studio/entities/kitchen_studio.entity";
import { Users_cyc } from "#/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum statusPayKitchen{
    PENDING = 'pending',
    APPROVE = 'approve',
    REJECT = 'reject'
}
@Entity()
export class KitchenPayment{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length: 36, nullable: true})
    order_id:string;

    @Column({type: "varchar", nullable: true})
    va_number:string;

    @Column({type: "varchar", nullable:true})
    payment_method: string;

    @Column({type: "varchar", nullable:true})
    bank: string;
    @Column({
        type: "timestamp",
    })
    date: Date;

    @Column({
        type:'bigint'
    })
    totalPayment: number;

    @Column({
        type:'bigint'
    })
    adminFee: number;

    @Column({
        type:'enum',
        enum: statusPayKitchen,
        default: statusPayKitchen.PENDING
    })
    status:statusPayKitchen;

    @CreateDateColumn({
        type:'timestamp with time zone',
        nullable:false
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type:'timestamp with time zone',
        nullable: true
    })
    deletedAt: Date;

    @ManyToOne(() => Users_cyc, (admin) => admin.kitchenPay)
    admin: Users_cyc;

    @ManyToOne(() => KitchenStudio, (kitchen) => kitchen.kitchenPay)
    kitchen: KitchenStudio;
}