import { Module } from '@nestjs/common';
import { GaleryKitchenController } from './galery_kitchen.controller';
import { GaleryKitchenService } from './galery_kitchen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GaleryKitchen } from './entites/galery.entities';

@Module({
  imports:[TypeOrmModule.forFeature([GaleryKitchen])],
  controllers: [GaleryKitchenController],
  providers: [GaleryKitchenService]
})
export class GaleryKitchenModule {}
