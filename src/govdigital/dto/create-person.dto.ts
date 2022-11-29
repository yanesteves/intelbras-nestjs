import { IsString } from "class-validator";

export class CreatePersonDTO {
    @IsString()
    readonly name: string;
    
    driver: CreateDriverLicenseDTO;
}

export class CreateDriverLicenseDTO {
    registry: string;
    category: string;
}