import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosEntity } from './entity/todos.entity';
import { userEntity } from 'src/users/entites/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodosEntity, userEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
