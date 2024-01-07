import { Test, TestingModule } from '@nestjs/testing';
import { RiwayatKitchenService } from './riwayat-kitchen.service';

describe('RiwayatKitchenService', () => {
  let service: RiwayatKitchenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiwayatKitchenService],
    }).compile();

    service = module.get<RiwayatKitchenService>(RiwayatKitchenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
