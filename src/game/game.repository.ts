import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Game } from "./game.entity";
import { User } from "src/auth/user.entity";
import { Role } from "./role.entity";


@Injectable()
export class GameRepository extends Repository<Game> {
    constructor(dataSorce: DataSource) {
        super(Game, dataSorce.createEntityManager());
    }

    async createResult(userId: User, roleId: Role,userSession: string, roomSession:string, isWin: boolean): Promise<any> {

        const game = this.create({ userId, roleId, isWin })
        

        const result = await this.createQueryBuilder()
            .insert()
            .into(Game)
            .values({
                userId: userId,
                roleId: roleId,
                userSession: userSession,
                roomSession: roomSession,
                isWin: isWin
            }).execute()
     
        return "success";
    }
}