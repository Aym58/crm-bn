import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseDto> {
    const result: ResponseDto = await this.authService.register(createUserDto);
    return result;
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<ResponseDto> {
    return await this.authService.login(loginDto);
  }
}
