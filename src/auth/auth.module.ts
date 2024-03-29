import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

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
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [ JwtStrategy,],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
