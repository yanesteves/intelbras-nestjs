import { Test, TestingModule } from '@nestjs/testing';
import { GovDigitalService } from './govdigital.service';

describe('GovDigitalService', () => {
  let service: GovDigitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovDigitalService],
    }).compile();

    service = module.get<GovDigitalService>(GovDigitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
