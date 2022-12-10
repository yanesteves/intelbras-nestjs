export class OutputUserDTO {
    readonly id: number;
    readonly name: string;
    readonly bio: string;
    readonly username: string;
    followers?: number;
    following?: number;
    readonly tweets: any;    
}