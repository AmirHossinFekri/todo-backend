import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/users/entites/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sUP4iRpAhlTp8vdpGlxfLcxR1vfk65yX',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([userEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
