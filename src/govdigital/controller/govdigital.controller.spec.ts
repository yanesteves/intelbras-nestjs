import { Test, TestingModule } from '@nestjs/testing';
import { GovDigitalController } from './govdigital.controller';
import { GovDigitalService } from '../service/govdigital.service';

describe('GovDigitalController', () => {
  let controller: GovDigitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GovDigitalController],
      providers: [GovDigitalService],
    }).compile();

    controller = module.get<GovDigitalController>(GovDigitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
