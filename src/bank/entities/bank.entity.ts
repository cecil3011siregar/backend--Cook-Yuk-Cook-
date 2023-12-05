import { Users_cyc } from "#/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Bank {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column({type: 'varchar'})
    // id_users: string;

    @Column({type: 'varchar'})
    account_number: string;

    @Column({ type: 'varchar'})
    bank_name: string;

    @Column({type: 'varchar'})
    account_owner: string;


    @CreateDateColumn({
        type: "timestamp with time zone",
        nullable: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp with time zone",
        nullable: false
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: "timestamp with time zone",
        nullable: true
    })
    deletedAt: Date;

    @ManyToOne(() => Users_cyc, (users) => users.bank)
    users: Users_cyc;
}