import { Body, Controller, Get, Post, ValidationPipe, Headers, ForbiddenException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }    
    
    @Get('me') 
    async me(@Headers('authorization') authorizationToken) {
        try {
            const validate = await this.authService.validateToken(authorizationToken)   
            return {
                validate
            }
        } catch (error) {
            throw new ForbiddenException()
        }        
    }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
        await this.authService.signUp(createUserDto);
        return {
            message: 'Cadastro realizado.'
        }
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDTO
    ) {
        return await this.authService.signIn(credentialsDto);
    }

    // @Post()
    // async insert(@Body() usuario: CriaUsuarioDTO): Promise<UserEntity> {
    //     try {
    //         return await this.usuarioService.insert(usuario);
    //     } catch (err) {
    //         if (err.code == 23505)
    //             throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
    //         throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);

    //     }
    // }

}
