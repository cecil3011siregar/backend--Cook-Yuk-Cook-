import { Module } from '@nestjs/common';
import { GaleryKitchenController } from './galery_kitchen.controller';
import { GaleryKitchenService } from './galery_kitchen.service';

@Module({
  controllers: [GaleryKitchenController],
  providers: [GaleryKitchenService]
})
export class GaleryKitchenModule {}
