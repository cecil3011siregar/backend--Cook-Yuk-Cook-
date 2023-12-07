import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifikasi, statusNotif } from './entities/notifikasi.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateNotifikasiDto } from './dto/create-notifikasi.dto';
import { UsersService } from '#/users/users.service';
import { UpdateStatusNotifikasiDto } from './dto/update-status-notifikasi.dto';
import { UpdateMessageNotifikasiDto } from './dto/update-message-notifikasi.dto';

@Injectable()
export class NotifikasiService {
    constructor(
        @InjectRepository(Notifikasi)
        private notifRepo: Repository<Notifikasi>,
        private usersService: UsersService

    ){}

    findAll(){
        return this.notifRepo.findAndCount()
    }

    async findNotifById(id : string){
        try{
            return await this.notifRepo.findOneOrFail({
                where:{id},
                relations:{receiver: true, sender: true}
            })
        }catch(e){
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Data not found"
                    },
                    HttpStatus.NOT_FOUND
                )
            }else{
                throw e
            }
        }
    }

    async findNotifUnread(inputStatus: string){
        let enumStatus:any

        if(inputStatus == "unread"){
            enumStatus = statusNotif.UNREAD
        }
        try{
            console.log(enumStatus, "ini status")
            const result =  await this.notifRepo.find({
                where:{status: enumStatus}
            })
            console.log(result, "halo")
            return result
        }catch(e){
            throw e
        }
    }
    async createNotifikasi(createNotifikasiDto: CreateNotifikasiDto){
        try{
            const receiver = await this.usersService.getUsersById(createNotifikasiDto.receiver)
            
            const sender = await this.usersService.getUsersById(createNotifikasiDto.sender)
            const notif = new Notifikasi()
            notif.receiver = receiver
            notif.sender = sender
            notif.title = createNotifikasiDto.title
            notif.message = createNotifikasiDto.message
            
            console.log(createNotifikasiDto, "ada ga cuy")
            const insertNotif = await this.notifRepo.insert(notif)
            return await this.notifRepo.findOneOrFail({
                where:{id:insertNotif.identifiers[0].id}
            })
        }catch(e){
            throw e
        }
    }

}
