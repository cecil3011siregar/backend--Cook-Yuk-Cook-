import { Module } from '@nestjs/common';
import { KitchenStudioController } from './kitchen_studio.controller';
import { KitchenStudioService } from './kitchen_studio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenStudio } from './entities/kitchen_studio.entity';
import { UsersModule } from '#/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([KitchenStudio]), UsersModule],
  controllers: [KitchenStudioController],
  providers: [KitchenStudioService]
  
})
export class KitchenStudioModule {}
