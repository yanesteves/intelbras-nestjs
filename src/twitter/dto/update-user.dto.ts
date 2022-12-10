import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsOptional()
    readonly name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    readonly username: string;

    @IsBoolean()
    @IsOptional()
    readonly privateAccount: boolean;

    @IsString()
    @IsOptional()
    readonly bio?: string;

}
