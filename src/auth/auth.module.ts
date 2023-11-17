import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users_cyc } from '#/users/entities/user.entity';
import { UsersModule } from '#/users/users.module';
import { LevelUsersModule } from '#/level-users/level-users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'TOPSECRET2023',
      signOptions:{expiresIn:'24h'}
    }),
    TypeOrmModule.forFeature([Users_cyc]),UsersModule, LevelUsersModule]
})
export class AuthModule {}
