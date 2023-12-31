import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './entites/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
