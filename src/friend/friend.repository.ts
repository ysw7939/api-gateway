import { Injectable } from "@nestjs/common";
import { Friend } from "./friend.entity";
import { DataSource, Repository } from "typeorm";
import { FriendRequest } from "./friend.request.entity";


@Injectable()
export class FriendRepository extends Repository<Friend> {
    constructor(dataSource: DataSource) {
        super(Friend, dataSource.createEntityManager());
    }

    async createFriend(requestId: FriendRequest): Promise<void> {
        const Friend1 = this.create({ 
            userId: requestId.toUser,
            friendId: requestId.fromUser,
            friendRequestId: requestId
        })
  
        const Friend2 = this.create({ 
            userId: requestId.fromUser,
            friendId: requestId.toUser,
            friendRequestId: requestId
        })

        await this.save([Friend1, Friend2]);
    }

    async userFriend(userId: number): Promise<Friend[]> {
        const friendList = await this.createQueryBuilder()
            .select([
                "id",
                "complyed_at",
                "user_id",
                "friend_id",
                "friend_request_id",
            ])
            .where("user_id = :user", { user: userId })
            .execute()
        

        return friendList;
    }
}