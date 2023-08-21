import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { UserTaskDto } from './users.model';
import { Username } from 'src/auth/auth.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get(':id')
    getUser(@Param('id') username: string) {
        const user = this.usersService.getOne(username);
        if (!user) throw new HttpException('No user', HttpStatus.NOT_FOUND);
        return user;
    }

    @Get()
    getAllUser(@Req() req: Request) {
        const token = req.cookies?.token;
        return this.usersService.getAll(token);
    }

    @Post('task')
    @UsePipes(new ValidationPipe())
    addTaskCompleted(@Body() body: UserTaskDto, @Username() username: string) {
        this.usersService.taskCompleted(body.task, username)
        return;
    }

    @Delete('task/:id')
    removeTaskCompleted(@Param('id') id: string, @Username() username: string) {
        this.usersService.cancelTaskCompleted(+id, username)
        return;
    }
}
