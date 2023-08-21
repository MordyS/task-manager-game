import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TasksService } from './tasks.service';
import { TaskDto } from './tasks.model';
import { Username } from 'src/auth/auth.decorator';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get('id')
    getTask(@Param('id') id: string) {
        const task = this.tasksService.getOne(Number(id))
        if (!task) throw new HttpException('No task', HttpStatus.NOT_FOUND);
        return task;
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createTask(@Body() body: TaskDto, @Username() username: string) {
        return this.tasksService.create(body, username);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    editTask(@Param('id') id: string, @Body() body: TaskDto, @Username() username: string) {
        this.tasksService.edit(+id, body, username);
        return;
    }
}
