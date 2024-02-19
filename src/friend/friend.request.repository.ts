import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Brackets, DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import {FriendRequest } from "./friend.request.entity";

import { User } from "src/auth/user.entity";
import { Friend } from "./friend.entity";


@Injectable()
export class FriendRequestRepository extends Repository<FriendRequest>{
    

    constructor(dataSource: DataSource, ) {
        super(FriendRequest, dataSource.createEntityManager());
    }

    async createFriend(fromUser: User, toUser: User): Promise<any> {
        const friend = this.create({ fromUser, toUser })
        const resultId = await this.createQueryBuilder()
            .insert()
            .values({
                fromUser: fromUser,
                toUser: toUser
            }).execute()
        const id = resultId.identifiers[0].friendId

        const select = await this.createQueryBuilder()
            .select([
                "friend_request_id",
                "from_user",
                "to_user",
                "is_friend",
                "created_at",
                "is_read"
            ])
            .where("friend_request_id = :id", { id: id })
            .execute()
        return select[0]
    }

    async findToUser(userId: number): Promise<Friend[]> {
        return await this.createQueryBuilder()
            .select([
                "friend_request_id",
                "from_user",
                "to_user",
                "is_friend",
                "created_at",
                "is_read"
            ])
            .where("to_user = :userId", { userId: userId })
            .execute()
    }

    async findFromUser(userId: number): Promise<Friend[]> {
        return await this.createQueryBuilder()
            .select([
                "friend_request_id",
                "from_user",
                "to_user",
                "is_friend",
                "created_at",
                "is_read"
            ])
            .where("from_user = :userId", { userId: userId })
            .execute()
    }
}