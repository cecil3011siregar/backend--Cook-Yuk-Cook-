import { PrivateClass } from "#/private-class/entities/private-class.entity";
import { RegularClass } from "#/regular-class/entities/regular-class.entity";
import { Training_theme } from "#/training_theme/entities/training_theme.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Material{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:"varchar", length:255})
    name: string;

    @Column({type: "varchar", length: 255})
    link: string;

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

      @ManyToOne(()=>RegularClass, (regular)=>regular.material)
      regular:RegularClass;

      @ManyToOne(()=>PrivateClass, (priv)=>priv.material)
      priv:PrivateClass;

      @OneToMany(() =>Training_theme, (theme)=> theme.material)
      theme: Training_theme
}
