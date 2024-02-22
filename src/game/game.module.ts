import { Module } from '@nestjs/common';

import { GameController } from './game.controller';

import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GAME',
        transport: Transport.TCP,
        options: { port: 8103 },
      },
    ]),
    AuthModule,
  ],
  controllers: [GameController],
  providers: [],
})
export class GameModule {}
