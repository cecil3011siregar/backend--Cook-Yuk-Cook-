import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenStudio } from './entities/kitchen_studio.entity';
import { Users_cyc } from '#/users/entities/user.entity';
import { KitchenStudioController } from './kitchen_studio.controller';
import { KitchenStudioService } from './kitchen_studio.service';

@Module({
    imports: [TypeOrmModule.forFeature([KitchenStudio]), Users_cyc],
    controllers: [KitchenStudioController],
    providers: [KitchenStudioService],
})
export class KitchenStudioModule {}
