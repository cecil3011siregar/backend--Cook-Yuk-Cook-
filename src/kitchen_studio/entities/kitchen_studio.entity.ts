import { Users_cyc } from "#/users/entities/user.entity";
import { Column, JoinColumn, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum statusKitchen{
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable'

}

@Entity()
export class KitchenStudio{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Users_cyc)
    @JoinColumn()
    users: Users_cyc;

    @Column({type: "varchar"})
    legality: string;

    @Column({
        type: "enum",
        enum: statusKitchen,
        default: statusKitchen.UNAVAILABLE
    })
    status: statusKitchen

    @Column({type: "int"})
    numberOfChef: number;

    @Column({type: "int"})
    chefOnWork: number;

    @Column({type: "int"})
    chefOnAvailable: number;

    @Column({type: "varchar"})
    logos: string;

    @Column({type: "varchar"})
    description: string;

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


}