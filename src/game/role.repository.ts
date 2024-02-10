import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Role } from "./role.entity";


@Injectable()
export class RoleRepository extends Repository<Role> {
    constructor(dateSorce: DataSource) {
        super(Role, dateSorce.createEntityManager());
    }

        async findRole(roleId: number): Promise<Role> {
        return this.findOne({ where: { roleId } });
    }
}