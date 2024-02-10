import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameRepository } from './game.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from 'src/auth/user.respository';
import { Role } from './role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game,Role])
  ],
  controllers: [GameController],
  providers: [GameService, GameRepository, RoleRepository, UserRepository]
})
export class GameModule {}
