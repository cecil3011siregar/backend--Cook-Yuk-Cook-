import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ){}
    
    @Get()
    async getAllUsers(){
        const [data, count] = await this.usersService.getAll();
        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            MESSAGE: "Success"
        }
    }

    @Get('/:id')
    async getDetailUsers(@Param('id', ParseUUIDPipe) id: string){
        return{
            data: await this.usersService.getUsersById(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Post()
    async createUsers(@Body()createUsersDto: CreateUsersDto){
        const data = await this.usersService.createUsers(createUsersDto)
        return{
            data,
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }

    @Put('/:id')
    async updateUsers(@Param('id', ParseUUIDPipe) id: string, @Body() updateUsersDto: UpdateUsersDto){
        const data = await this.usersService.updateUsers(id, updateUsersDto)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Delete('/:id')
    async deleteUsers(@Param('id', ParseUUIDPipe) id: string){
        return{
            statusCode: HttpStatus.OK,
            message: await this.usersService.deleteUsers(id)
        }
    }
}