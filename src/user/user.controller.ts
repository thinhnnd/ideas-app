import { 
    Controller, 
    Post, 
    Put, 
    Delete,
    Get, 
    Body,
    UsePipes,
    UseGuards
} from '@nestjs/common';

import {UserService} from './user.service'
import {UserDTO} from './user.dto';
import { ValidationPipe} from '../shared/validation.pipe';
import {AuthGuard} from '../shared/auth.gaurd';
import {User} from './user.decorator';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get('api/users')
    // @UseGuards(new AuthGuard())
    showAllUsers() {
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDTO) {
       return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO) {
        return this.userService.register(data);
    }
}