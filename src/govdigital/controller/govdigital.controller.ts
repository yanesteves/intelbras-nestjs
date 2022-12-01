import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GovDigitalService } from '../service/govdigital.service';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { UpdateDriverLicenseDTO } from '../dto/update-driver-license.dto';
import { VaccineService } from '../service/vaccine.service';
import { LinkVaccinesInCardDTO } from '../dto/link-vaccine-to-card.dto';

@Controller('govdigital')
export class GovDigitalController {
  constructor(private readonly govDigitalService: GovDigitalService,
    private readonly vaccineService: VaccineService) { }

  @Post()
  async create(@Body() createPerson: CreatePersonDTO) {
    return await this.govDigitalService.createPerson(createPerson);
  }

  @Get('/person/:id')
  async findFullPerson(@Param('id') id) {
    return await this.govDigitalService.fullInfoPerson(+id);
  }

  @Get('/persons')
  findPersons() {
    return this.govDigitalService.personsWithLicenseDrivers();
  }

  @Get('/drivers')
  findDrivers() {
    return this.govDigitalService.driversWithPersonInfo();
  }

  @Patch('driver-license/:id')
  async update(@Param('id') id, @Body() updateDriverLicense: UpdateDriverLicenseDTO) {
    return await this.govDigitalService.updateDriverLicense(+id, updateDriverLicense);
  }

  @Delete('person/:id')
  async removePerson(@Param('id') id: string) {
    return await this.govDigitalService.deletePerson(+id);
  }

  @Delete('address/:id')
  async removeAddress(@Param('id') id: string) {
    return await this.govDigitalService.deleteAddress(+id);
  }
}
