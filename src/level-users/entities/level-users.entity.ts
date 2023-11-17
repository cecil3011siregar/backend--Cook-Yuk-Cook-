import { Users_cyc } from "#/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LevelUsers{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "varchar", length: 25})
    name: string;

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

    @OneToMany(() => Users_cyc, (user) => user.level)
    user: Users_cyc;
}