import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsersDto } from './dto/login-users.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { RegisterDto } from './dto/register.dto';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('reg')
    async registerK(@Body()registerDto: RegisterDto){
        const data = await this.authService.register(registerDto)
        return{
            data,
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }
    
    // @Post('/register')
    // async registerUsers(@Body()registerUsersDto: RegisterUsersDto){
        // const data = await this.authService.register(registerUsersDto)
        // return{
        //     data,
        //     statusCode: HttpStatus.CREATED,
        //     message: "Success"
        // }
    // }

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
