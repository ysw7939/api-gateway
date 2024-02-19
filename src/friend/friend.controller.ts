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
import { ResponseEntity } from 'src/configs/res/ResponseEntity';

@Controller('friend')
@ApiBearerAuth('access-token')
@ApiTags('친구 API')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
    constructor(private friendService: FriendService) { }
    
    @Post('/request')
    @ApiResponse({})
    async request(@Body(ValidationPipe) friendRequestDto: FriendRequestDto): Promise<ResponseEntity<FriendRequest>> {
        return ResponseEntity.OK_WITH(await this.friendService.friendRequest(friendRequestDto));
    }

    @Put('/comply')
    async comply(@Body(ValidationPipe) friendComplyDto: FriendComplyDto): Promise<ResponseEntity<string>> {
        await this.friendService.friendCreate(friendComplyDto);
        return ResponseEntity.OK();
    }

    @Get('/friend-list/:id')
    @ApiResponse({
        status: 200,
        type: [FriendListDto]
    })
    async getFriends(@Param('id')  id: number): Promise<ResponseEntity<Friend[]>> {
        return ResponseEntity.OK_WITH(await this.friendService.findFriendList(id));
    }

    @Get('/requested-list/:id')
    @ApiResponse({
        status: 200,
        type: [FriendRequestListDto]
    })
    async requestFriend(@Param('id')  id: number): Promise<ResponseEntity<Friend[]>> {
        return ResponseEntity.OK_WITH(await this.friendService.requestFriendList(id));
    }

    @Get('/received-list/:id')
    @ApiResponse({
        status: 200,
        type: [FriendRequestListDto]
    })
    async receviedFriend(@Param('id')  id: number): Promise<ResponseEntity<Friend[]>> {
        return ResponseEntity.OK_WITH(await this.friendService.receivedFriendList(id));
    }
}
