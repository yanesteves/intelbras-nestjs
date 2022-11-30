import { DataSource } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { DriverLicenseEntity } from './entities/driver-license.entity';
import { PersonEntity } from './entities/person.entity';

export const govDigitalProviders = [
  {
    provide: 'PERSON_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PersonEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DRIVER_LICENSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DriverLicenseEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AddressEntity),
    inject: ['DATA_SOURCE'],
  },
];