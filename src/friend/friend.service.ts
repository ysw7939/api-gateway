import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendRequestRepository } from './friend.request.repository';
import { UserRepository } from 'src/auth/user.respository';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';
import { FriendRepository } from './friend.repository';
import { FriendComplyDto } from './dto/friend.comply.dto';
import { Friend } from './friend.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FriendService {
    constructor(
        private friendRequestRepository: FriendRequestRepository,
        private userRepository: UserRepository,
        private friendRepository: FriendRepository
    ) { }

    async friendRequest(friendRequestDto: FriendRequestDto, user:User): Promise<FriendRequest>{
        const { nickname } = friendRequestDto;

        if (await this.userRepository.checkNickname(nickname)) {
            throw new BadRequestException("해당 닉네임을 가진 유저가 없습니다.")
        };
        
        const user1 = user;
        const user2 = await this.userRepository.findOne({where: {nickname: nickname}});

        return this.friendRequestRepository.createFriend(user1,user2);
    }

    async friendCreate(friendComplyDto: FriendComplyDto): Promise<string> {
        const { friendRequestId } = friendComplyDto;
       
        const friendRequest = await this.friendRequestRepository.findOne({
            where: { friendId: friendRequestId }, relations: {
                toUser: true,
                fromUser:true
        } });
        await this.friendRequestRepository.update(friendRequestId, { isFriend: true });
        await this.friendRepository.createFriend(friendRequest)

        return "친구요청이 수락되었습니다."
    }

    async findFriendList(user: User): Promise<Friend[]> {
        return await this.friendRepository.userFriend(user.userId);
    }

    async requestFriendList(user: User): Promise<Friend[]> {
        return await this.friendRequestRepository.findFromUser(user.userId);
    }

    async receivedFriendList(user: User): Promise<Friend[]> {
        return await this.friendRequestRepository.findToUser(user.userId);
    }

    async deleteFriendRequest(requestId: Number): Promise<void> {
        return await this.friendRequestRepository.deleteRequest(requestId);
    }
}
