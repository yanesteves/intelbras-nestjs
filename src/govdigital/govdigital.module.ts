import { Module } from '@nestjs/common';
import { GovDigitalService } from './service/govdigital.service';
import { databaseProviders } from 'src/core/database/database.providers';
import { govDigitalProviders } from './govdigital.providers';
import { GovdigitalController } from './controller/govdigital.controller';

@Module({
  controllers: [GovdigitalController],
  providers: [
    GovDigitalService,
    ...databaseProviders,
    ...govDigitalProviders
  ]
})
export class GovDigitalModule {}
