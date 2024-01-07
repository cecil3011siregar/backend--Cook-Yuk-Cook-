import { Module } from '@nestjs/common';
import { RiwayatKitchenService } from './riwayat-kitchen.service';

@Module({
  providers: [RiwayatKitchenService]
})
export class RiwayatKitchenModule {}
