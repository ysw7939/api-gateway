import { BaseEntity, Column, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Game } from "../game/game.entity";

@Entity({ name: 'tb_role' })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "role_id" })
    roleId: number;

    @Column({ name: "role_name" })
    roleName: string;
}