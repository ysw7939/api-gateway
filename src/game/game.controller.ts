import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';

import { GameResultDto } from './dto/game.result.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseEntity } from 'src/configs/res/ResponseEntity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('game')
@UseGuards(AuthGuard())
export class GameController {
    constructor(private gameService: GameService) { }

    @Post('/result')
    async create(@Body(ValidationPipe) gameResultDto: GameResultDto, @GetUser() user: User): Promise<ResponseEntity<string>> {
        await this.gameService.gameRecord(gameResultDto, user);
        return ResponseEntity.OK();
    }
}
