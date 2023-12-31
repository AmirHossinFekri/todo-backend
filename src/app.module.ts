import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { userEntity } from './users/entites/user.entity';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { TodosEntity } from './todos/entity/todos.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [userEntity, TodosEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TodosModule,
  ],
})
export class AppModule {}
