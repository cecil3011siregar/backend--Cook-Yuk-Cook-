import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { LevelUsersService } from './level-users.service';
import { CreateLevelUsersDto } from './dto/create-level-users.dto';
import { UpdateLevelUsersDto } from './dto/update-level-users.dto';

@Controller('level-users')
export class LevelUsersController {
    constructor(
        private levelUsersService : LevelUsersService
    ){}

    @Get()
    async getAllLevelUsers(){
        const [data, count] = await this.levelUsersService.getAll();
        return{
            data,
            count,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Get('/:id')
    async getDetailLevelUsers(@Param('id', ParseUUIDPipe) id: string){
        return {
            data : await this.levelUsersService.getLevelById(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Post()
    async createLevelUsers(@Body() createLevelUsersDto: CreateLevelUsersDto){
        const data = await this.levelUsersService.createLevel(createLevelUsersDto)
        return{
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Put('/:id')
    async updateLevelUsers(@Param('id', ParseUUIDPipe) id: string, @Body() updateLevelUsersDto: UpdateLevelUsersDto){
        const data = await this.levelUsersService.updateLevel(id, updateLevelUsersDto)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Delete('/:id')
    async deleteLevelUsers(@Param('id', ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: await this.levelUsersService.deleteLevel(id)
        }
    }
}
