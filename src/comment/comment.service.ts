import { 
    Injectable, 
    HttpException, 
    HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';

import { IdeaEntity } from '../idea/idea.entity';
import { UserEntity } from '../user/user.entity';

import { CommentDTO } from './comment.dto';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
        @InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ){}

    private toResponseObject(comment: CommentEntity) {
        const responseObject: any = comment;
        if(comment.author) {
            responseObject.author = comment.author.toResponseObject(false);
        }
        return responseObject;
    }

    async showByIdea(id: string, page: number = 1) {
        const comments = await this.commentRepository.find({
            where: {idea: id}, 
            relations: ['author'],
            take: 25,
            skip: 25 * (page -1 )
        });

        return comments.map( comment => this.toResponseObject(comment) );
    }

    async showByUser(id: string, page: number = 1) {
        const comments = await this.commentRepository.find({
            where: {author: id},
            relations: ['author'],
            take: 25,
            skip: 25 * (page -1 )
        });

        return comments.map( comment => this.toResponseObject(comment));
    }

    async show(id: string) {
        const comment = await this.commentRepository.findOne({where: {id: id}, relations: ['author', 'idea']});
        return this.toResponseObject(comment);
    }

    async create(id: string, userId: string, data: CommentDTO) {
        const idea = await this.ideaRepository.findOne({where: {id: id}});
        const user = await this.userRepository.findOne({where: {id: userId}});

        const comment = await this.commentRepository.create({
            ...data,
            idea: idea,
            author: user
        })

        await this.commentRepository.save(comment);
        return this.toResponseObject(comment);
    }

    async destroyComment(id: string, userId: string) {
        const comment = await this.commentRepository.findOne({
            where: {id: id}, 
            relations:['author','idea'],
        });

        if(comment.author.id !== userId) {
            throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED);
        }

        this.commentRepository.remove(comment);
        return this.toResponseObject(comment);
    }
}
