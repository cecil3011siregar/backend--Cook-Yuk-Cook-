import { Test, TestingModule } from '@nestjs/testing';
import { RiwayatKitchenController } from './riwayat-kitchen.controller';

describe('RiwayatKitchenController', () => {
  let controller: RiwayatKitchenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiwayatKitchenController],
    }).compile();

    controller = module.get<RiwayatKitchenController>(RiwayatKitchenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
