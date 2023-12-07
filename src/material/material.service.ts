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

  async createMaterial(creatematerialDto: CreateMaterialDto) {
    try {
        let cariKelas;
        const material = new Material();
        if (creatematerialDto.type_class === 'Regular Class') {
            cariKelas = await this.regularClassService.findById(creatematerialDto.idclass);
            material.regular = cariKelas;
        } else if (creatematerialDto.type_class === 'Private Class') {
            cariKelas = await this.privateClassService.findDetailPrivate(creatematerialDto.idclass);
            material.priv = cariKelas;
        }
        material.link = creatematerialDto.link;
        material.name = creatematerialDto.name;

        const insertMaterial = await this.materialRepo.insert(material);
        const result = await this.materialRepo.findOneOrFail({
            where: { id: insertMaterial.identifiers[0].id },
        });
        return result;
    } catch (e) {
      throw e;
    }
  }
  

  
}
