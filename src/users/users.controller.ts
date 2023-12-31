import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CPDto } from './dto/ChangePassword.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  userInfo(@Req() request: Request) {
    return this.usersService.userInfo(request['user'].sub);
  }

  @Patch('change-password')
  changePassword(@Body() CPData: CPDto, @Req() request: Request) {
    return this.usersService.changePassword(CPData, request['user'].sub);
  }
}
