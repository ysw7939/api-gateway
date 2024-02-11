import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';

import { Game } from './game.entity';
import { GameResultDto } from './dto/game.result.create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('game')
@UseGuards(AuthGuard())
export class GameController {
    constructor(private gameService: GameService) { }

    @Post('/result')
    create(@Body(ValidationPipe) gameResultDto: GameResultDto): Promise<any> {
        return this.gameService.gameRecord(gameResultDto);
    }
}
