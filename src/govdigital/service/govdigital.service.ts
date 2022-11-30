/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from '../dto/create-address.dto';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { UpdateDriverLicenseDTO } from '../dto/update-driver-license.dto';
import { AddressEntity } from '../entities/address.entity';
import { DriverLicenseEntity } from '../entities/driver-license.entity';
import { PersonEntity } from '../entities/person.entity';

@Injectable()
export class GovDigitalService {

  constructor(
    @Inject('PERSON_REPOSITORY')
    private personRepository: Repository<PersonEntity>,
    @Inject('DRIVER_LICENSE_REPOSITORY')
    private driverLicenseRepository: Repository<DriverLicenseEntity>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>
  ) { }

  fullInfoPerson(id: number): Promise<PersonEntity> {
    return new Promise(async (resolve, reject) => {
      const res = await this.personRepository.findOne({
        where: {
          id: id
        },
        relations: {
          driver: true,
          addresses: true
        }
      })

      resolve(res)
    })
  }

  driversWithPersonInfo(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const res = await this.driverLicenseRepository.find({
        relations: {
          person: true
        }
      })

      resolve(res)
    })
  }

  personsWithLicenseDrivers(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const res = await this.personRepository.find({
        relations: {
          driver: true
        }
      })

      resolve(res)
    })
  }

  createPersonWithLicenseDriver(createPerson: CreatePersonDTO): Promise<PersonEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const personToBeSaved = await this.personRepository.create(createPerson);
        const person: PersonEntity = await this.personRepository.save(personToBeSaved);
        resolve(person);
      } catch (error) {
        reject({ code: error.code, detail: error.detail })
      }
    })
  }

  createAddressForPerson(id: number, createAddress: CreateAddressDTO): Promise<any> {
    return new Promise(async (resolve) => {      
      let address = this.addressRepository.create();
      address = {...createAddress, ...address };

      const person: PersonEntity = await this.personRepository.findOne({
        where: { id: id },
        relations: {
          addresses: true
        }
      });            

      person.addAddress(address);

      this.personRepository.save(person);

      resolve(address);
    });
  }

  deleteAddress(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const { affected } = await this.addressRepository.delete({ id: id })
        if (affected === 0) {
          reject({
            code: 20000,
            detail: 'Este ID não está presente no banco de dados ou não foi possível remover.'
          })
        }
        resolve(true)
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail
        })
      }
    })
  }

  updateDriverLicense(id: number, updateDriverLicense: UpdateDriverLicenseDTO) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.driverLicenseRepository.update({ id: id }, updateDriverLicense)
        // verifico se alguma linha foi afetada após o update.
        const { affected } = response;
        if (affected === 0) {
          reject({
            code: 20000,
            detail: 'Este ID não está presente no banco de dados ou não foi possível atualizar.'
          })
        }
        resolve(true)
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail
        })
      }
    })
  }

  deletePerson(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { affected } = await this.personRepository.delete({ id: id })
        if (affected === 0) {
          reject({
            code: 20000,
            detail: 'Este ID não está presente no banco de dados ou não foi possível remover.'
          })
        }
        resolve(true)
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail
        })
      }
    })
  }
}