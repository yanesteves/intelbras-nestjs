import { IsNumberString } from "class-validator";

export class FindOneUserDTO {
    @IsNumberString(undefined, { message: "O ID informado não é válido." })
    readonly id: number;
}