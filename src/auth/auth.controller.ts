import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ){
    return this.authService.register(createUserDto);
    }

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ){
    return this.authService.update(id, updateUserDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto
  ){

    return this.authService.login(loginDto.email, loginDto.password);
  }


}
