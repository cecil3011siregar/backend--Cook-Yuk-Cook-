import { Injectable, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, EntityNotFoundError, Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { RegularClassService } from '#/regular-class/regular-class.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { PrivateClassService } from '#/private-class/private-class.service';
import { UpdateMaterialDto } from './dto/update-material.dto';

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
            relations:{regular: true, priv:true}
        });
        return result;
    } catch (e) {
      throw e;
    }
  }

  async findMaterialByClass(id: string){
    try{
      const materialByClass = await this.materialRepo.findAndCount({
        where:[{regular:{id}}, {priv:{id}}],
      relations: {regular: true, priv: true}})
      // console.log(materialByClass, "halo")
      return materialByClass;
    }catch(e){
      if(e instanceof EntityNotFoundError){
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: "Data Not Found"
          },
          HttpStatus.NOT_FOUND
        )
      }else{
        throw e
      }
    }
  }

  async findMaterialById(id: string){
    try{
      return await this.materialRepo.findOneOrFail({where:{id},relations:{regular: true, priv:true}})
    }catch(e){
      if(e instanceof EntityNotFoundError){
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: "Data Not Found"
          },
          HttpStatus.NOT_FOUND
        )
      }else{
        throw e
      }
    }
  }

  async updateMaterial(id: string, updateMaterialDto: UpdateMaterialDto){
    try{
      const material = await this.findMaterialById(id)
      if((material.regular && material.regular.id !== updateMaterialDto.idclass) || 
        (material.priv && material.priv.id !== updateMaterialDto.idclass)){
        throw new BadRequestException("ID Class tidak ditemukan!")
      }
      material.name = updateMaterialDto.name
      material.link = updateMaterialDto.link

      await this.materialRepo.update(id, material)
      // console.log(material, "halo")
      return await this.materialRepo.findOneOrFail({where:[{id}, {regular:{id}}, {priv:{id}}]})
    }catch(e){
      throw e
    }
  }

  async deleteMaterial(id: string){
    try{
      await this.findMaterialById(id)
      
      await this.materialRepo.softDelete(id)
      return "Success"
    }catch(e){
      throw e
    }
  }
}