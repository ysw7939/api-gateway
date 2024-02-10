import { Controller, ValidationPipe,Post,Body, Param,Get } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendRequestDto } from './dto/friend.request.dto';
import { FriendRequest } from './friend.request.entity';

@Controller('friend')
export class FriendController {
    constructor(private friendService: FriendService) { }
    
    @Post('/request')
    create(@Body(ValidationPipe) friendRequestDto: FriendRequestDto): Promise<FriendRequest> {
        return this.friendService.friendRequest(friendRequestDto);
    }
}
