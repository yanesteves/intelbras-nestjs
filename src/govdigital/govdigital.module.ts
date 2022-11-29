import { Module } from '@nestjs/common';
import { GovdigitalService } from './govdigital.service';
import { databaseProviders } from 'src/core/database/database.providers';
import { govDigitalProviders } from './govdigital.providers';
import { GovdigitalController } from './controller/govdigital.controller';

@Module({
  controllers: [GovdigitalController],
  providers: [
    GovdigitalService,
    ...databaseProviders,
    ...govDigitalProviders
  ]
})
export class GovDigitalModule {}
