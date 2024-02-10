import { Injectable } from '@nestjs/common';
import { FriendRequestRepository } from './friend.request.repository';
import { UserRepository } from 'src/auth/user.respository';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';
import { FriendRepository } from './friend.repository';
import { FriendComplyDto } from './dto/friend.comply.dto';
import { Friend } from './friend.entity';

@Injectable()
export class FriendService {
    constructor(
        private friendRequestRepository: FriendRequestRepository,
        private userRepository: UserRepository,
        private friendRepository: FriendRepository
    ) { }

    async friendRequest(friendRequestDto: FriendRequestDto): Promise<FriendRequest>{
        const { fromUser, toUser } = friendRequestDto;

        const user1 = await this.userRepository.findUser(fromUser)
        const user2 = await this.userRepository.findUser(toUser)


        return this.friendRequestRepository.createFriend(user1,user2);
    }

    async friendCreate(friendComplyDto: FriendComplyDto): Promise<Friend[]> {
        const { friendRequestId } = friendComplyDto;
       
        const friendRequest = await this.friendRequestRepository.findOne({
            where: { friendId: friendRequestId }, relations: {
                toUser: true,
                fromUser:true
        } });
        await this.friendRequestRepository.update(friendRequestId, { isFriend: true });
        return await this.friendRepository.createFriend(friendRequest)
    }

}
