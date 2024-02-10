import { Injectable } from '@nestjs/common';
import { FriendRepository } from './friend.repository';
import { UserRepository } from 'src/auth/user.respository';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';

@Injectable()
export class FriendService {
    constructor(
        private friendRepository: FriendRepository,
        private userRepository: UserRepository
    ) { }

    async friendRequest(friendRequestDto: FriendRequestDto): Promise<FriendRequest>{
        const { fromUser, toUser } = friendRequestDto;

        const user1 = await this.userRepository.findUser(fromUser)
        const user2 = await this.userRepository.findUser(toUser)


        return this.friendRepository.createFriend(user1,user2);
    }
}
