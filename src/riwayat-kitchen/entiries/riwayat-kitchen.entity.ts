import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Riwayat {
@PrimaryGeneratedColumn('uuid')
id: string;
}
