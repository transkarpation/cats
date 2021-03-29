import { Body, Controller, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Post('/signup')
    signUp(@Body(new ValidationPipe({ stopAtFirstError: true })) authCredentials: AuthCredentialsDto): Promise<void> {
        return this.authService.singUp(authCredentials)
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<{token: string}> {
        const username = await this.authService.signIn(authCredentials)

        if(!username) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = await this.jwtService.sign({username})
        return { token }
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    async test(@GetUser() user: User) {
        console.log(user)
    }
}
