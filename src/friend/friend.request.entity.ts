import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany,JoinColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name : 'tb_friend_request'})
export class FriendRequest extends BaseEntity {
    @ApiProperty({
        description: '친구 신청 목록의 고유 번호',
        example: 1,
        type: Number,
    })
    @PrimaryGeneratedColumn({ name: "friend_request_id" })
    friendId: number; 
    
    @ApiProperty({
        description: '친구 신청을 수락했는지를 확인 하는 항목',
        example:false,
        type: Boolean,
    })
    @Column({ type: 'tinyint', name:'is_friend', default:false })
    isFriend: boolean;

    @ApiProperty({
        description: '친구 신청을 요청한 날짜 및 시간',
        type: Date,
    })
    @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({
        description: '친구 신청한 사용자의 고유 번호',
        example: 1,
        type: Number,
    })
    @ManyToOne(type => User, {createForeignKeyConstraints: false, nullable: false})
    @JoinColumn({ name: 'from_user', referencedColumnName: 'userId' }) 
    fromUser: User;

    @ApiProperty({
        description: '친구 신청 받은 사용자의 고유 번호',
        example: 2,
        type: Number,
    })
    @ManyToOne(type => User, {createForeignKeyConstraints: false, nullable: false})
    @JoinColumn({ name: 'to_user', referencedColumnName: 'userId' })
    toUser: User;

    @ApiProperty({
        description: '친구 신청 받은 사용자가 요청을 읽었는지 확인 하는 항목',
        example:false,
        type: Boolean,
    })
    @Column({ name: 'is_read',type: 'tinyint' ,default: false})
    isRead: boolean;
}