import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegularClass, statusRegular } from './entities/regular-class.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { KitchenStudioService } from '#/kitchen_studio/kitchen_studio.service';
import { TrainingThemeService } from '#/training_theme/training_theme.service';
import { CreateRegClassDto } from './dto/create-regular-class.dto';
import { UpdateRegClassDto } from './dto/update-regular-class.dto';
import { ApproveRejectRegularDto } from './dto/approve-reject-regular.dto';
import { JumlahBenchesDto } from './dto/update-jumlah-benches.dto';
import { UsersService } from '#/users/users.service';

@Injectable()
export class RegularClassService {
    constructor(
        @InjectRepository(RegularClass)
        private regClassRepo: Repository<RegularClass>,
        private trainingThemeService: TrainingThemeService,
        private kitchenStudioService: KitchenStudioService,
        private usersService: UsersService
    ){}

    getAll(){
        return this.regClassRepo.findAndCount()
    }
    
    async findById(id: string){
        try{
            return await this.regClassRepo.findOneOrFail({
                where:{id},
                relations:{kitchen:{users:true}, theme:true}
            })
        }catch(e){
            if(e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "data not found"
                    },
                    HttpStatus.NOT_FOUND
                )
            }
        }
    }

    async createPengajuan(createRegClassDto: CreateRegClassDto){
        try{
            const themeId = await this.trainingThemeService.findOneById(createRegClassDto.theme_id)
            const kitchenId = await this.kitchenStudioService.getKitchenStudioById(createRegClassDto.kitchen_id)
            const biaya = (createRegClassDto.price * 10)/ 100
            const price = createRegClassDto.price + biaya
            const regular = new RegularClass
            regular.kitchen = kitchenId
            regular.theme = themeId
            regular.courseName = createRegClassDto.courseName
            regular.startDate = createRegClassDto.startDate
            regular.endDate = createRegClassDto.endDate
            regular.numberOfBenches = createRegClassDto.numberOfBenches
            regular.adminFee = biaya
            regular.price = price
            regular.description = createRegClassDto.description

            const buatPengajuan = await this.regClassRepo.insert(regular)
            const result = await this.regClassRepo.findOneOrFail({
                where:{id:buatPengajuan.identifiers[0].id}
            })
            return result;
        }catch(e){
            throw e
        }
    }

    async updatePengajuan(id: string, updateRegClassDto: UpdateRegClassDto){
        try{
            const cariRegular = await this.findById(id)
            if(cariRegular.status === "pending"){
                const theme = await this.trainingThemeService.findOneById(updateRegClassDto.theme_id)
                const pengajuan = new RegularClass
                pengajuan.theme = theme
                pengajuan.courseName = updateRegClassDto.courseName
    
                await this.regClassRepo.update(id, pengajuan)
    
                return await this.regClassRepo.findOneOrFail({
                    where:{id}
                })
            }else{
                throw new BadRequestException("Tidak dapat mengubah data pengajuan kelas!")
            }
        }catch(e){
            throw e
        }
    }
    async regClassByKitchen(id:string){
        try{
            const kitchen = await this.kitchenStudioService.getKitchenStudioById(id)
            return await this.regClassRepo.find({
                where:{kitchen:{id:kitchen.id}}
            })
        }catch(e){
            console.log("ga ada")
        }
    }

    async approveRegular(id: string){
        try{
            await this.findById(id)
            const approve: any = "approve"
            const regular = new RegularClass
            regular.status = approve
            await this.regClassRepo.update(id, regular)
            return await this.regClassRepo.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        } 
    }

    async rejectRegular(id: string, approveRejectRegularDto: ApproveRejectRegularDto){
        try{
            await this.findById(id)
            const regular = new RegularClass
            regular.status = approveRejectRegularDto.status
            regular.alasan = approveRejectRegularDto.alasan

            await this.regClassRepo.update(id, regular)
            return await this.regClassRepo.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        } 
    }

    async updateJumlahBenches(id: string, updateJumlahBenchesDto: JumlahBenchesDto){
        try{
            await this.findById(id)
            const benches = new RegularClass()
            benches.numberOfBenches = updateJumlahBenchesDto.numberOfBenches

            await this.regClassRepo.update(id, benches)
            return await this.regClassRepo.findOneOrFail({
            where:{id}
            })
        }catch(e){
            throw e
        }
    }

    async findRegClassByUsersKitchen(id: string){
        try{
            const coba = await this.usersService.getUsersById(id)
            console.log(coba.id, "halo")
            return await this.regClassRepo.find({
                where:{kitchen:{users:{id:id}}, status:statusRegular.APPROVE},
                relations:{theme:true, material:true, usersPay:{users: true}}
                // relations:{kitchen:{users:true}, usersPay:true}
            })
        }catch(e){
            throw e
        }
    }
    async findRegClassByUsersKitchenPending(id: string){
        try{
            const coba = await this.usersService.getUsersById(id)
            console.log(coba.id, "halo")
            return await this.regClassRepo.find({
                where:{kitchen:{users:{id:id}}, status:statusRegular.PENDING},
                relations:{theme:true, material:true, usersPay:{users: true}}
                // relations:{kitchen:{users:true}, usersPay:true}
            })
        }catch(e){
            throw e
        }
    }
}
