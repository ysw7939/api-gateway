import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Brackets, DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import {FriendRequest } from "./friend.request.entity";

import { User } from "src/auth/user.entity";


@Injectable()
export class FriendRequestRepository extends Repository<FriendRequest>{
    

    constructor(dataSource: DataSource, ) {
        super(FriendRequest, dataSource.createEntityManager());
    }

    async createFriend(fromUser: User, toUser: User ): Promise<FriendRequest>{
        const friend = this.create({ fromUser, toUser })
        let friendRequest;
        try {
            friendRequest =  this.save(friend)
        }catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }

        return friendRequest;
    }


}