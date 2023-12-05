import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateClass } from './entities/private-class.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreatePrivateClassDto } from './dto/create-private-class.dto';
import { UsersService } from '#/users/users.service';
import { KitchenStudioService } from '#/kitchen_studio/kitchen_studio.service';
import { TrainingThemeService } from '#/training_theme/training_theme.service';

@Injectable()
export class PrivateClassService {
    constructor(
        @InjectRepository(PrivateClass)
        private privateRepo: Repository<PrivateClass>,
        private usersService: UsersService,
        private kitchenService:KitchenStudioService,
        private themeService: TrainingThemeService
    ){}

    findAll(){
        return this.privateRepo.findAndCount()
    }
}
