import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async login(username: string, password: string) {

        const hashed = this.usersService.getPassword(username);

        if (hashed && await bcrypt.compare(password, hashed))
            return this.jwtService.sign({ username: username });

        throw new UnauthorizedException();

    }

    async signup(username: string, password: string) {
        const user = this.usersService.getOne(username);
        if (user) throw new HttpException('Username is already in use', HttpStatus.CONFLICT);
        
        const hashedPassword = await bcrypt.hash(password, 8);
        this.usersService.create({ username: username, password: hashedPassword });
        return this.jwtService.sign({ username: username });
    }
}
