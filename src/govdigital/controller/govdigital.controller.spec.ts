import { Test, TestingModule } from '@nestjs/testing';
import { GovdigitalController } from './govdigital.controller';
import { GovdigitalService } from '../govdigital.service';

describe('GovdigitalController', () => {
  let controller: GovdigitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GovdigitalController],
      providers: [GovdigitalService],
    }).compile();

    controller = module.get<GovdigitalController>(GovdigitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
