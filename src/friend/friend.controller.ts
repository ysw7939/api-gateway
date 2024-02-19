import { Controller, ValidationPipe,Post,Body, Param,Get, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';
import { FriendComplyDto } from './dto/friend.comply.dto';
import { Friend } from './friend.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FriendListDto } from './dto/friend.list.dto';
import { FriendRequestListDto } from './dto/friend.request.list.dto';

@Controller('friend')
@ApiBearerAuth('access-token')
@ApiTags('친구 API')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
    constructor(private friendService: FriendService) { }
    
    @Post('/request')
    @ApiResponse({})
    request(@Body(ValidationPipe) friendRequestDto: FriendRequestDto): Promise<FriendRequest> {
        return this.friendService.friendRequest(friendRequestDto);
    }

    @Put('/comply')
    comply(@Body(ValidationPipe) friendComplyDto: FriendComplyDto): Promise<string> {
        return this.friendService.friendCreate(friendComplyDto);
    }

    @Get('/friend-list/:id')
    @ApiResponse({
        status: 200,
        type: [FriendListDto]
    })
    getFriends(@Param('id')  id: number): Promise<Friend[]> {
        return this.friendService.findFriendList(id);
    }

    @Get('/requested-list/:id')
    @ApiResponse({
        status: 200,
        type: [FriendRequestListDto]
    })
    requestFriend(@Param('id')  id: number): Promise<Friend[]> {
        return this.friendService.requestFriendList(id);
    }

    @Get('/received-list/:id')
    @ApiResponse({
        status: 200,
        type: [FriendRequestListDto]
    })
    receviedFriend(@Param('id')  id: number): Promise<Friend[]> {
        return this.friendService.receivedFriendList(id);
    }
}
