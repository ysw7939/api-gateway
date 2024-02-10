import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Game } from "./game.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Role } from "./role.entity";


@Injectable()
export class GameRepository extends Repository<Game> {
    constructor(dataSorce: DataSource) {
        super(Game, dataSorce.createEntityManager());
    }

    async createResult(userId: User, roleId: Role, isWin: boolean): Promise<Game> {

        const game = this.create({ userId, roleId, isWin })
        let result;

        result = await this.save(game)
     
        return result;
    }
}