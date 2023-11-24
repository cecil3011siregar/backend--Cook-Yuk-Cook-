import { GaleryKitchen } from "#/galery_kitchen/entites/galery.entities";
import { Users_cyc } from "#/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class KitchenStudio{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:"text"})
    legality: string;

    @Column({type:"int"})
    numberOfChefs: number;

    @Column({type:"int"})
    chefOnWork: number;

    @Column({type:"int"})
    chefOnAvailable: number;

    @Column({type:'text'})
    logos: string;

    @Column({type:"text"})
    description: string;

    @CreateDateColumn({
        type:"timestamp with time zone",
        nullable:false
    })
    createdAt: Date;

    @UpdateDateColumn({
        type:"timestamp with time zone",
        nullable: false
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: "timestamp with time zone",
        nullable:true
    })
    deletedAt:Date;

    @OneToMany(() => GaleryKitchen, (gallery) => gallery.kitchen)
    gallery:GaleryKitchen;
    
    @OneToOne(()=> Users_cyc)
    @JoinColumn()
    users: Users_cyc
}