import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    readonly username: string;

    @IsBoolean()
    readonly privateAccount: boolean;

    @IsString()
    readonly bio: string;

}
