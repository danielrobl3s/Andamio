import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ){}


    async register(createUserDto: CreateUserDto){

        const hashed_password = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                ...createUserDto,
                password: hashed_password
            }
        });

        const { password: _, ...result} = user;

        return result;
    }


    async update(id: string, updateUserDto: UpdateUserDto){
        return this.prismaService.user.update({
            where: {id: id},
            data: updateUserDto
        })
    }

    async login(email: string, password: string){
        const user = await this.prismaService.user.findUnique({
            where: {email: email}
        });

        if(!user){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Contraseña incorrecta, intenta de nuevo');
        }

        const payload = { sub: user.id, email: user.email, name: user.name };
        
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }

        

}
