import { Body, Controller, Get, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/users/users.model';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() userData: UserAuthDto, @Res() res: Response) {
        const token = await this.authService.login(userData.username, userData.password);
        res.cookie('token', token, { httpOnly: true });
        res.send({ username: userData.username })
    }


    @Post('signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() userData: UserAuthDto, @Res() res: Response) {
        const token = await this.authService.signup(userData.username, userData.password);
        res.cookie('token', token, { httpOnly: true });
        res.send({ username: userData.username })
    }

    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('token', { httpOnly: true })
        res.send({ status: 'ok' })
    }
}
