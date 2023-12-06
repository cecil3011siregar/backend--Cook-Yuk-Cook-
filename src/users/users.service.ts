import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users_cyc, statusUser } from './entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { LevelUsersService } from '#/level-users/level-users.service';
import { UpdateUsersDto } from './dto/update-user.dto';
import { CreateUsersDto } from './dto/create-user.dto';
import { KitchenStudio } from '#/kitchen_studio/entities/kitchen_studio.entity';
import { ApproveRejectDto } from './dto/approve-Reject.dto';
import { UpdateKitchenDto } from './dto/updateKitchen-user.dto';
import { UpdatePasswordDto } from './dto/updatePassword-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users_cyc)
    private usersRepo: Repository<Users_cyc>,
    private levelUsersService: LevelUsersService,
    @InjectRepository(KitchenStudio)
    private kitchenRepo: Repository<KitchenStudio>,
  ) {}

  getAll(page: number = 1, limit: number = 10) {
    return this.usersRepo.findAndCount({
      skip: --page * limit,
      take: limit,
    });
  }

  async getUsersById(id: string) {
    try {
      return await this.usersRepo.findOneOrFail({ where: { id } });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }
  // find user by role
  async findUserByRole(id: string) {
    try {
      const level = await this.levelUsersService.getLevelById(id);
      return await this.usersRepo.findAndCount({
        where: { level: { id: level.id } },
      });
    } catch (e) {
      throw e;
    }
  }
  async updateUsers(id: string, updateUsersDto: UpdateUsersDto) {
    try {
      await this.getUsersById(id);

      const usersEntity = new Users_cyc();
      usersEntity.name = updateUsersDto.name;
      usersEntity.email = updateUsersDto.email;
      // usersEntity.salt = updateUsersDto.salt
      usersEntity.password = updateUsersDto.password;
      usersEntity.dateOfBirth = new Date(updateUsersDto.dateOfBirth);
      usersEntity.gender = updateUsersDto.gender;
      usersEntity.phoneNumber = updateUsersDto.phoneNumber;
      usersEntity.photo = updateUsersDto.photo;
      usersEntity.address = updateUsersDto.address;
      // usersEntity.status = updateUsersDto.status

      await this.usersRepo.update(id, usersEntity);

      return await this.usersRepo.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }

  async createUsers(createAdminDto: CreateAdminDto) {
    try {
      const findLevelUsersId = await this.levelUsersService.getLevelById(createAdminDto.level_id);
      console.log(findLevelUsersId, "ada ga")
      let status:any
        if(findLevelUsersId && findLevelUsersId.name === "Admin"){
          status = "active"
        }else{
          console.log("role tidak ditemukan")
        }
      //generate salt
      const saltGenerate = await bcrypt.genSalt();
      //hash password
      const password = createAdminDto.password;
      const hash = await bcrypt.hash(password, saltGenerate);
      const usersEntity = new Users_cyc;
      usersEntity.name = createAdminDto.name;
      usersEntity.email = createAdminDto.email;
      usersEntity.salt = saltGenerate
      usersEntity.password = hash
      usersEntity.level = findLevelUsersId;
      usersEntity.status = status
      const insertUsers = await this.usersRepo.insert(usersEntity);
      return this.usersRepo.findOneOrFail({
        where: { id: insertUsers.identifiers[0].id },
      });
    } catch (e) {
      throw e;
    }
  }

  async approveRejectKitchen(id: string, approveRejectDto: ApproveRejectDto) {
    try {
      await this.getUsersById(id);
      const users = new Users_cyc();
      users.status = approveRejectDto.status;

      await this.usersRepo.update(id, users);
      return await this.usersRepo.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }

  async updateStatusStudio(id: string, updateKitchenDto: UpdateKitchenDto) {
    try {
      await this.getUsersById(id);

      const usersEntity = new Users_cyc();
      usersEntity.status = updateKitchenDto.status;

      await this.usersRepo.update(id, usersEntity);

      return await this.usersRepo.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    try {
      await this.getUsersById(id);

      //generate salt
      const saltGenerate = await bcrypt.genSalt();

      //hash password
      const password = updatePasswordDto.password;
      const hash = await bcrypt.hash(password, saltGenerate);

      const usersEntity = new Users_cyc();
      usersEntity.password = hash;

      await this.usersRepo.update(id, usersEntity);

      return await this.usersRepo.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteUsers(id: string) {
    try {
      await this.getUsersById(id);

      await this.usersRepo.softDelete(id);
      return 'Success';
    } catch (e) {
      throw e;
    }
  }
}
