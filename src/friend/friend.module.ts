import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
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
      {
        name: 'FRIEND',
        transport: Transport.TCP,
        options: { port: 8102 },
      },
    ]),
    AuthModule,
  ],
  controllers: [FriendController],
  providers: [],
})
export class FriendModule {}
