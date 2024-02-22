import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRequestRepository } from './friend.request.repository';
import { FriendRequest } from './friend.request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRepository } from './friend.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: { port: 8101 },
      },
    ]),
    TypeOrmModule.forFeature([FriendRequest]),
    AuthModule,
  ],
  controllers: [FriendController],
  providers: [
    FriendService,
    FriendRequestRepository,
    FriendRepository,
  ],
})
export class FriendModule {}
