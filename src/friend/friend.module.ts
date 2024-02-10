import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRequestRepository } from './friend.request.repository';
import { UserRepository } from 'src/auth/user.respository';
import { FriendRequest } from './friend.request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRepository } from './friend.repository';

@Module({
    imports: [
    TypeOrmModule.forFeature([FriendRequest])
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRequestRepository, UserRepository, FriendRepository]
})
export class FriendModule {}
