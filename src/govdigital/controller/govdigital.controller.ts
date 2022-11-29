import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GovdigitalService } from '../govdigital.service';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { UpdateDriverLicenseDTO } from '../dto/update-driver-license.dto';

@Controller('govdigital')
export class GovdigitalController {
  constructor(private readonly govdigitalService: GovdigitalService) {}

  // POST /govdigital
  // {
  //   "name": "Yan Esteves",
  //   "driver": {
  //       "registry": "123456",
  //       "category": "B"
  //   }
  // }
  @Post()
  async create(@Body() createPerson: CreatePersonDTO) {
    return await this.govdigitalService.createPersonWithLicenseDriver(createPerson);
  }
  // @Post()
  // create(@Body() createGovdigitalDto: CreateGovdigitalDto) {
  //   return this.govdigitalService.create(createGovdigitalDto);
  // }

  @Get('/persons')
  findPersons() {
    return this.govdigitalService.personsWithLicenseDrivers();
  }

  @Get('/drivers')
  findDrivers() {
    return this.govdigitalService.driversWithPersonInfo();
  }

  @Patch('driver-license/:id')
  async update(@Param('id') id, @Body() updateDriverLicense: UpdateDriverLicenseDTO) {
    return await this.govdigitalService.updateDriverLicense(+id, updateDriverLicense);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.govdigitalService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGovdigitalDto: UpdateGovdigitalDto) {
  //   return this.govdigitalService.update(+id, updateGovdigitalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.govdigitalService.remove(+id);
  // }
}
