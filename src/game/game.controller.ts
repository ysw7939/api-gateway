import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';

import { Game } from './game.entity';
import { GameResultDto } from './dto/game.result.create.dto';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) { }

    @Post('/result')
    create(@Body(ValidationPipe) gameResultDto: GameResultDto): Promise<Game> {
        return this.gameService.gameRecord(gameResultDto);
    }
}
