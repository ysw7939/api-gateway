import { Controller, ValidationPipe,Post,Body, Param,Get, Put, ParseIntPipe } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';
import { FriendComplyDto } from './dto/friend.comply.dto';
import { Friend } from './friend.entity';

@Controller('friend')
export class FriendController {
    constructor(private friendService: FriendService) { }
    
    @Post('/request')
    request(@Body(ValidationPipe) friendRequestDto: FriendRequestDto): Promise<FriendRequest> {
        return this.friendService.friendRequest(friendRequestDto);
    }

    @Put('/comply')
    comply(@Body(ValidationPipe) friendComplyDto: FriendComplyDto): Promise<Friend[]> {
        return this.friendService.friendCreate(friendComplyDto);
    }

    @Get('/friend-list/:id')
    getFriends(@Param('id')  id: number): Promise<Friend[]> {
        return this.friendService.findFriendList(id);
    }

    @Get('/requested-list/:id')
    requestFriend(@Param('id')  id: number): Promise<Friend[]> {
        return this.friendService.requestFriendList(id);
    }
}
