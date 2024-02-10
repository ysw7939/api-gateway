import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRepository } from './friend.repository';
import { UserRepository } from 'src/auth/user.respository';
import { FriendRequest } from './friend.request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
    TypeOrmModule.forFeature([FriendRequest])
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository, UserRepository]
})
export class FriendModule {}
