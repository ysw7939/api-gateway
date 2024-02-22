import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { GameResultDto } from './dto/game.result.create.dto';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ClientProxy } from '@nestjs/microservices';

@Controller('game')
@UseGuards(AuthGuard())
export class GameController {
  constructor(
    @Inject('GAME')
    private readonly gameClient: ClientProxy,
  ) {}

  @Post('/result')
  async create(
    @Body(ValidationPipe) gameResultDto: GameResultDto,
    @GetUser() user: User,
  ) {
    gameResultDto.user = user;
    return await this.gameClient.send('create', gameResultDto);
  }
}
