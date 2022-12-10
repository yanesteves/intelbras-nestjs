export class OutputUserDTO {
    readonly id: number;
    readonly name: string;
    readonly bio: string;
    readonly username: string;
    readonly privateAccount: boolean;
    followers?: number;
    following?: number;
    readonly tweets: any;    
}