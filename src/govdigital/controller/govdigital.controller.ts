import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GovDigitalService } from '../service/govdigital.service';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { UpdateDriverLicenseDTO } from '../dto/update-driver-license.dto';
import { CreateAddressDTO } from '../dto/create-address.dto';

@Controller('govdigital')
export class GovdigitalController {
  constructor(private readonly govDigitalService: GovDigitalService) {}

  @Post()
  async create(@Body() createPerson: CreatePersonDTO) {
    return await this.govDigitalService.createPersonWithLicenseDriver(createPerson);
  }
  // @Post()
  // create(@Body() createGovdigitalDto: CreateGovdigitalDto) {
  //   return this.govDigitalService.create(createGovdigitalDto);
  // }

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

  @Post('link-address/:id')
  async createAddressForPerson(@Param('id') id, @Body() createAddress: CreateAddressDTO) {
    return await this.govDigitalService.createAddressForPerson(+id, createAddress);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.govDigitalService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGovdigitalDto: UpdateGovdigitalDto) {
  //   return this.govDigitalService.update(+id, updateGovdigitalDto);
  // }

  @Delete('person/:id')
  async removePerson(@Param('id') id: string) {
    return await this.govDigitalService.deletePerson(+id);
  }
}
