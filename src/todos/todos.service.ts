import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodosEntity } from './entity/todos.entity';
import { CreateTodoDto } from './dto/createTodo.dto';
import { userEntity } from 'src/users/entites/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosEntity)
    private readonly TODOS: Repository<TodosEntity>,
    @InjectRepository(userEntity)
    private readonly USER: Repository<userEntity>,
  ) {}

  async createTodo(data: CreateTodoDto, id: string) {
    const { title, description } = data;
    const user = await this.USER.findOneBy({ id });

    const todo = new TodosEntity();
    todo.title = title;
    todo.description = description;
    todo.user = user;
    this.TODOS.save(todo);

    return new HttpException('ثبت شد', HttpStatus.CREATED);
  }

  async getTodo(todoId: number, userId: string) {
    const user = await this.USER.findOneBy({ id: userId });
    const todo = await this.TODOS.findOne({
      where: { id: todoId },
      relations: { user: true },
    });
    if (!todo) {
      throw new HttpException('امکان ندارد', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (todo.user.id !== user.id) {
      throw new HttpException('مشکلی وجود دارد', HttpStatus.UNAUTHORIZED);
    }

    return todo;
  }
  async completedTodo(UserId: string, TodoId: number) {
    const user = await this.USER.findOneBy({ id: UserId });
    const todo = await this.TODOS.findOne({
      where: { id: TodoId },
      relations: { user: true },
    });
    if (todo.user.id !== user.id) {
      throw new HttpException('دسترسی غیرمجاز', HttpStatus.UNAUTHORIZED);
    }
    todo.completed = !todo.completed;
    await this.TODOS.save(todo);
    return new HttpException('انجام شد', HttpStatus.OK);
  }
  async deleteTodo(UserId: string, TodoId: number) {
    const user = await this.USER.findOneBy({ id: UserId });
    const todo = await this.TODOS.findOne({
      where: { id: TodoId },
      relations: { user: true },
    });
    if (!todo) {
      throw new HttpException('امکان ندارد', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (todo.user.id !== user.id) {
      throw new HttpException('دسترسی غیرمجاز', HttpStatus.UNAUTHORIZED);
    }
    await this.TODOS.softRemove(todo);
    return new HttpException('حذف شد', HttpStatus.OK);
  }
}
