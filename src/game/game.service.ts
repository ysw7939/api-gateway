import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { RoleRepository } from './role.repository';
import { GameResultDto } from './dto/game.result.create.dto';
import { Game } from './game.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class GameService {
        constructor(
        private roleRepository: RoleRepository,
        private gameRepository: GameRepository
    ) { }

    async gameRecord(gameResultDto: GameResultDto, user:User): Promise<any> {
        const { roleId, userSession, roomSession, isWin } = gameResultDto;
        
        const role = await this.roleRepository.findRole(roleId);

        return this.gameRepository.createResult(user, role, userSession, roomSession,isWin);
    }
}
