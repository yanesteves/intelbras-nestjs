import { IsString } from "class-validator";
import { VaccineCardEntity } from "../entities/vaccine-card.entity";
import { CreateDriverLicenseDTO } from "./create-driver-license.dto";

export class CreatePersonDTO {
    @IsString()
    readonly name: string;
    
    driver: CreateDriverLicenseDTO;

    vaccine_card: VaccineCardEntity;
}