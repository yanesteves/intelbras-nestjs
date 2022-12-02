import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateVaccineDTO } from '../dto/create-vaccine.dto';
import { LinkVaccinesInCardDTO } from '../dto/link-vaccine-to-card.dto';
import { VaccineService } from '../service/vaccine.service';

@Controller('vaccines')
export class VaccineController {
  constructor(private vaccineService: VaccineService) { }

  @Get()
  async findVaccines() {
    return await this.vaccineService.vaccines();
  }

  @Post()
  async createVaccine(@Body() createVaccine: CreateVaccineDTO) {
    return await this.vaccineService.createVaccine(createVaccine);
  }

  @Delete(':id')
  async unlinkVaccine(@Param('id') id) {
    return await this.vaccineService.unlinkVaccine(1, +id);
  }

  @Post('link-vaccine/:id')
  async linkVaccineForCard(@Param('id') vaccineCard, @Body() body: LinkVaccinesInCardDTO) {
    return await this.vaccineService.linkVaccineInCard(+vaccineCard, body.vaccines);
  }
}
