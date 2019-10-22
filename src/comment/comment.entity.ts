import { 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinTable

} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { IdeaEntity } from '../idea/idea.entity';

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn() 
    created: Date;

    @Column('text')
    comment: string;

    @ManyToOne(type => UserEntity)
    @JoinTable()
    author: UserEntity;

    @ManyToOne(type => IdeaEntity, idea => idea.comments)
    idea: IdeaEntity;
}
