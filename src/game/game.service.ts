import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from 'src/auth/user.respository';
import { GameResultDto } from './dto/game.result.create.dto';
import { Game } from './game.entity';

@Injectable()
export class GameService {
        constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository,
        private gameRepository: GameRepository
    ) { }

    async gameRecord(gameResultDto: GameResultDto): Promise<any> {
        const { userId, roleId, userSession,roomSession,isWin } = gameResultDto;

        const user = await this.userRepository.findUser(userId);
        const role = await this.roleRepository.findRole(roleId);

        return this.gameRepository.createResult(user, role, userSession, roomSession,isWin);
    }
}
