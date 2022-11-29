import { IsString } from "class-validator";
import { CreateDriverLicenseDTO } from "./create-driver-license.dto";

export class CreatePersonDTO {
    @IsString()
    readonly name: string;
    
    driver: CreateDriverLicenseDTO;
}