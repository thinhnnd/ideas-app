import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    UsePipes, 
    UseGuards 
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe} from '../shared/validation.pipe';
import { Logger} from '@nestjs/common';
import {AuthGuard} from '../shared/auth.gaurd';
import {User} from '../user/user.decorator';


@Controller('/api/ideas')
export class IdeaController {
    private logger = new Logger('IdeaController');

    constructor(private ideaService: IdeaService) {}
    
    private logData(options: any) {
        options.user && this.logger.log('USER ' + JSON.stringify(options.user));
        options.body && this.logger.log('DATA ' + JSON.stringify(options.body));
        options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
    }

    @Get()
    showAllIdeas()  {
        return this.ideaService.showAllIdeas();
    }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createIdea(@User('id') user: string, @Body() data: IdeaDTO) {
        this.logData({user, data});
        return this.ideaService.create(user, data)
    }

    @Get(':id')
    readIdea(@Param('id') id: string) {
        return this.ideaService.read(id);
    }

    @Put(':id') 
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id') id: string,@User('id') user: string, @Body() data: Partial<IdeaDTO>) {
        this.logger.log({id, user, data});
        return this.ideaService.update(id, user, data)
    }   
    
    @Delete(':id')
    @UseGuards(new AuthGuard())
    deleteIdea(@Param('id') id: string, @User('id') user:string) {
        return this.ideaService.delete(id, user);
    }
 }
