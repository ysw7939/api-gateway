import { Controller, ValidationPipe,Post,Body, Param,Get, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';
import { FriendComplyDto } from './dto/friend.comply.dto';
import { Friend } from './friend.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FriendListDto } from './dto/friend.list.dto';
import { FriendRequestListDto } from './dto/friend.request.list.dto';
import { ResponseCheckDto, ResponseEntity, ResponseFriendListDto, ResponseFriendRequestDto, ResponseFriendRequestListDtoDto } from 'src/configs/res/ResponseEntity';

@Controller('friend')
@ApiBearerAuth('access-token')
@ApiTags('친구 API')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
    constructor(private friendService: FriendService) { }
    
    @ApiOperation({ summary: "친구 신청" })
    @ApiBody({
        type: FriendRequestDto,
        description: "친구 신청에 대한 필수 요청 항목"
    })
    @ApiResponse({
        type: ResponseFriendRequestDto
    })
    @Post('/request')
    async request(@Body(ValidationPipe) friendRequestDto: FriendRequestDto): Promise<ResponseEntity<FriendRequest>> {
        return ResponseEntity.OK_WITH(await this.friendService.friendRequest(friendRequestDto));
    }

    @ApiOperation({ summary: "친구 신청 수락" })
    @ApiBody({
        type: FriendComplyDto,
        description: "친구 신청 수락에 필요한 필수 요청 항목"
    })
    @ApiResponse({
        type: ResponseEntity
    })
    @Put('/comply')
    async comply(@Body(ValidationPipe) friendComplyDto: FriendComplyDto): Promise<ResponseEntity<string>> {
        await this.friendService.friendCreate(friendComplyDto);
        return ResponseEntity.OK();
    }

    @ApiOperation({ summary: "사용자의 친구 목록을 조회" })
    @ApiParam({
        name: 'userId',
        description : "조회할 사용자의 고유 번호"
    })
    @ApiResponse({
        type: ResponseFriendListDto,
    })
    @Get('/friend-list/:userId')
    async getFriends(@Param('userId')  id: number): Promise<ResponseEntity<Friend[]>> {
        return ResponseEntity.OK_WITH(await this.friendService.findFriendList(id));
    }
    
    @ApiOperation({ summary: "사용자의 친구 신청 내역 조회" })
    @ApiParam({
        name: 'userId',
        description : "조회할 사용자의 고유 번호"
    })
    @ApiResponse({
        type: ResponseFriendRequestListDtoDto,
    })
    @Get('/requested-list/:userId')
    async requestFriend(@Param('userId')  id: number): Promise<ResponseEntity<Friend[]>> {
        return ResponseEntity.OK_WITH(await this.friendService.requestFriendList(id));
    }

    @ApiOperation({ summary: "사용자의 친구 요청 받은 내역 조회" })
    @ApiParam({
        name: 'userId',
        description : "조회할 사용자의 고유 번호"
    })
    @ApiResponse({
        type: ResponseFriendRequestListDtoDto,
    })
    @Get('/received-list/:userId')
    async receviedFriend(@Param('userId')  id: number): Promise<ResponseEntity<Friend[]>> {
        return ResponseEntity.OK_WITH(await this.friendService.receivedFriendList(id));
    }
}
