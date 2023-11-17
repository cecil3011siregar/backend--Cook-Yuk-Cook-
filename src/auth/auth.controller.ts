import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUsersDto } from './dto/register-users.dto';
import { LoginUsersDto } from './dto/login-users.dto';
import { AuthGuard } from '@nestjs/passport/dist';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    
    @Post('/register')
    async registerUsers(@Body()registerUsersDto: RegisterUsersDto){
        const data = await this.authService.register(registerUsersDto)
        return{
            data,
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }

    @Post('/login')
    async login(@Body() loginUsersDto: LoginUsersDto){
        const data = await this.authService.login(loginUsersDto)
        return {
            data,
            statusCode: HttpStatus.OK,
            message:"Success"
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    profile(@Req() req){
        return req.user
    }
}
