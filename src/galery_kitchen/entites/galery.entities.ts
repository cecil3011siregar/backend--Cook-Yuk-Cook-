import { KitchenStudio } from "#/kitchen_studio/entities/kitchen_studio.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class GaleryKitchen{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'text'})
    photo: string;

    @CreateDateColumn({
        type: "timestamp with time zone",
        nullable: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        type:"timestamp with time zone",
        nullable: false
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type:"timestamp with time zone",
        nullable: true
    })
    deletedAt: Date;

    @ManyToOne(()=>KitchenStudio, (kitchen) => kitchen.gallery)
    kitchen:KitchenStudio;
}