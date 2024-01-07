import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegularClassModule } from '#/regular-class/regular-class.module';
import { PrivateClassModule } from '#/private-class/private-class.module';
import { Material } from './entities/material.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Material]), RegularClassModule, PrivateClassModule],
  controllers: [MaterialController],
  providers: [MaterialService]
})
export class MaterialModule {}
