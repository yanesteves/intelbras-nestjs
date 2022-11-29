/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePersonDTO } from './dto/create-person.dto';
import { DriverLicenseEntity } from './entities/driver-license.entity';
import { PersonEntity } from './entities/person.entity';

@Injectable()
export class GovdigitalService {

  constructor(
    @Inject('PERSON_REPOSITORY')
    private personRepository: Repository<PersonEntity>,
    @Inject('DRIVER_LICENSE_REPOSITORY')
    private driverLicenseRepository: Repository<DriverLicenseEntity>
  ) {

  }

  driversWithPersonInfo(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const res = await this.driverLicenseRepository.find({ relations: {
        person: true
      }})

      resolve(res)
    })
  }

  personsWithLicenseDrivers(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const res = await this.personRepository.find({ relations: {
        driver: true
      }})

      resolve(res)
    })
  }

  createPersonWithLicenseDriver(createPerson: CreatePersonDTO): Promise<PersonEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        // É criada uma instância da pessoa a ser salva.
        const personToBeSaved = await this.personRepository.create(createPerson);
        // // Realizo o "save" da instância criada anteriormente.
        const person: PersonEntity = await this.personRepository.save(personToBeSaved);
        resolve(person);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail
        })
      }
    })
  }

  findAll() {
    return `This action returns all govdigital`;
  }

  findOne(id: number) {
    return `This action returns a #${id} govdigital`;
  }

  update(id: number, updateGovdigitalDto: CreatePersonDTO) {
    return `This action updates a #${id} govdigital`;
  }

  remove(id: number) {
    return `This action removes a #${id} govdigital`;
  }
}
