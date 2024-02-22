import {
  Controller,
  ValidationPipe,
  Post,
  Body,
  Param,
  Get,
  Put,
  ParseIntPipe,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';
import { FriendComplyDto } from './dto/friend.comply.dto';
import { Friend } from './friend.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ResponseEntity,

} from 'src/configs/res/ResponseEntity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';


@UseGuards(AuthGuard('jwt'))
@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post('/request')
  async request(
    @Body(ValidationPipe) friendRequestDto: FriendRequestDto,
    @GetUser() user: User,
  ): Promise<ResponseEntity<FriendRequest>> {
    friendRequestDto.user = user;
    return ResponseEntity.OK_WITH(
      await this.friendService.friendRequest(friendRequestDto),
    );
  }

  @Post('/comply')
  async comply(
    @Body(ValidationPipe) friendComplyDto: FriendComplyDto,
  ): Promise<ResponseEntity<string>> {
    await this.friendService.friendCreate(friendComplyDto);
    return ResponseEntity.OK();
  }

  @Get('/friend-list')
  async getFriends(@GetUser() user: User): Promise<ResponseEntity<Friend[]>> {
    return ResponseEntity.OK_WITH(
      await this.friendService.findFriendList(user),
    );
  }

  @Get('/requested-list')
  async requestFriend(
    @GetUser() user: User,
  ): Promise<ResponseEntity<Friend[]>> {
    return ResponseEntity.OK_WITH(
      await this.friendService.requestFriendList(user),
    );
  }

  @Get('/received-list')
  async receviedFriend(
    @GetUser() user: User,
  ): Promise<ResponseEntity<Friend[]>> {
    return ResponseEntity.OK_WITH(
      await this.friendService.receivedFriendList(user),
    );
  }

  @Patch('/requested/:requestId')
  async delete(
    @Param('requestId') friendRequestId: number,
  ): Promise<ResponseEntity<string>> {
    await this.friendService.deleteFriendRequest(friendRequestId);
    return ResponseEntity.OK();
  }
}
