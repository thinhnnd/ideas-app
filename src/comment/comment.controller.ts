import { 
    Controller,
    Post,
    Put,
    Get,
    Param,
    UseGuards,
    UsePipes,
    Body,
    Delete
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ValidationPipe} from '../shared/validation.pipe';
import {AuthGuard} from '../shared/auth.gaurd';
import {User} from '../user/user.decorator';
import { CommentDTO } from './comment.dto';

@Controller('api/comments')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Get('idea/:id')
    showCommentByIdea(@Param('id') idea: string) {
        return this.commentService.showByIdea(idea);
    }

    @Get('user/:id')
    showCommentByUser(@Param('id') user: string) {
        return this.commentService.showByUser(user);
    }

    @Post('idea/:id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    create(@Param('id') id: string, @User('id') user: string, @Body() data: CommentDTO) {
        return this.commentService.create(id, user, data);
    }

    @Get(':id')
    showComment(@Param('id') id:string) {
        return this.commentService.show(id);
    }


    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyComment(@Param('id') id: string, @User('id') user: string) {
        return this.commentService.destroyComment(id, user);
    }

}
