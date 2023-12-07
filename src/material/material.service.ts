import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { RegularClassService } from '#/regular-class/regular-class.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { PrivateClassService } from '#/private-class/private-class.service';
import { RegularClass } from '#/regular-class/entities/regular-class.entity';
import { PrivateClass } from '#/private-class/entities/private-class.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepo: Repository<Material>,
    // @InjectRepository(RegularClass)
    // private regularRepo: Repository<RegularClass>,
    // @InjectRepository(PrivateClass)
    // private privateRepo: Repository<PrivateClass>,
    private regularClassService: RegularClassService,
    private privateClassService: PrivateClassService,
  ) {}

  findAll() {
    return this.materialRepo.findAndCount();
  }

  

  
}
