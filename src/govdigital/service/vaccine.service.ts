/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateVaccineDTO } from '../dto/create-vaccine.dto';
import { LinkVaccinesInCardDTO } from '../dto/link-vaccine-to-card.dto';
import { VaccineCardEntity } from '../entities/vaccine-card.entity';
import { VaccineEntity } from '../entities/vaccine.entity';

@Injectable()
export class VaccineService {

  constructor(
    @Inject('VACCINE_CARD_REPOSITORY')
    private vaccineCardRepository: Repository<VaccineCardEntity>,
    @Inject('VACCINE_REPOSITORY')
    private vaccineRepository: Repository<VaccineEntity>
  ) { }

  vaccines(): Promise<VaccineEntity[]> {
    return new Promise(async (resolve, reject) => {
      const res = await this.vaccineRepository.find()
      resolve(res)
    })
  }

  createVaccine(createVaccine: CreateVaccineDTO): Promise<VaccineEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const vaccineToBeSaved = this.vaccineRepository.create(createVaccine);
        const vaccine: VaccineEntity = await this.vaccineRepository.save(vaccineToBeSaved);
        resolve(vaccine);
      } catch (error) {
        reject({ code: error.code, detail: error.detail })
      }
    })
  }

  deleteVaccine(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { affected } = await this.vaccineRepository.delete({ id: id })
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

  linkVaccineInCard(idVaccineCard: number, vaccineToLink): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const vaccineCardToBeSaved = await this.vaccineCardRepository.findOne({
          where: {
            id: idVaccineCard
          },
          relations: {
            vaccines: true
          }
        })
        vaccineCardToBeSaved.addVaccines(vaccineToLink);

        await this.vaccineCardRepository.save(vaccineCardToBeSaved);
        resolve(true)
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail
        })
      }
    })
  }

  unlinkVaccine(idVaccineCard: number, idVaccine: number) {
    return new Promise(async (resolve) => {
      const vaccineCard = await this.vaccineCardRepository.findOne({
        where: { id: idVaccineCard },
        relations: { vaccines: true },
        select: {
          vaccines: {
            id: true
          }
        }
      });

      vaccineCard.removeVaccine(idVaccine);
      await this.vaccineCardRepository.save(vaccineCard)
      resolve(true)
    })
  }
}