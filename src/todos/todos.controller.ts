import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TodosEntity } from './entity/todos.entity';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('create')
  createTodo(@Body() data: TodosEntity, @Req() request: Request) {
    return this.todosService.createTodo(data, request['user'].sub);
  }

  @Get(':id')
  getTodo(@Req() request: Request) {
    return this.todosService.getTodo(
      parseInt(request.params.id),
      request['user'].sub,
    );
  }
  @Patch('completed/:id')
  completedTodo(@Req() request: Request) {
    return this.todosService.completedTodo(
      request['user'].sub,
      parseInt(request.params.id),
    );
  }

  @Delete('delete/:id')
  deleteTodo(@Req() request: Request) {
    return this.todosService.deleteTodo(
      request['user'].sub,
      parseInt(request.params.id),
    );
  }
}
