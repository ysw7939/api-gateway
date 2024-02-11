import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRequestRepository } from './friend.request.repository';
import { UserRepository } from 'src/auth/user.respository';
import { FriendRequest } from './friend.request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRepository } from './friend.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
    TypeOrmModule.forFeature([FriendRequest]),
    AuthModule
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRequestRepository, UserRepository, FriendRepository]
})
export class FriendModule {}
