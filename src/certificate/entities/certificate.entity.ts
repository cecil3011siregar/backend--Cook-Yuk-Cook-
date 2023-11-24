import { CONFIGURABLE_MODULE_ID } from "@nestjs/common/module-utils/constants";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Certificate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    date: Date;

    @Column({
        type: "time with time zone",
        nullable: false
    })
    createdAt: Date;

    @Column({
        type: "time with time zone",
        nullable: false
    })
    updateAt: Date;

    @DeleteDateColumn({
        type: "time with time zone",
        nullable: true
    })
    deletedAt: Date;

    
}