import { ApiProperty } from "@nestjs/swagger"

export class FriendRequestListDto {
    @ApiProperty({
        example: 1,
        description: '친구신청 고유 식별 번호'
    })
    friend_request_id: number

    @ApiProperty({
        example: 2,
        description: '신청한 유저 고유 식별 번호'
    })
    from_user: number

    @ApiProperty({
        example: 1,
        description: '신청받은 유저 고유 식별 번호'
    })
    to_user: number

    @ApiProperty({
        example: 1,
        description: '친구 고유 식별 번호'
    })
    is_friend: boolean

    @ApiProperty({
        description: '친구신청한 날짜 및 시간'
    })
    created_at: Date

    @ApiProperty({
        example: false,
        description: '친구신청받은 사용자가 읽었는지 여부'
    })
    is_read: boolean
} 