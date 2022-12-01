import { Module } from '@nestjs/common';
import { GovDigitalService } from './service/govdigital.service';
import { databaseProviders } from 'src/core/database/database.providers';
import { govDigitalProviders } from './govdigital.providers';
import { GovDigitalController } from './controller/govdigital.controller';
import { VaccineController } from './controller/vaccines.controller';
import { VaccineService } from './service/vaccine.service';

@Module({
  controllers: [GovDigitalController, VaccineController],
  providers: [
    GovDigitalService,
    VaccineService,
    ...databaseProviders,
    ...govDigitalProviders
  ]
})
export class GovDigitalModule {}
