import { Test, TestingModule } from '@nestjs/testing';
import { GovdigitalService } from './govdigital.service';

describe('GovdigitalService', () => {
  let service: GovdigitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovdigitalService],
    }).compile();

    service = module.get<GovdigitalService>(GovdigitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
