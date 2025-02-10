import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { GetUserFilteredDto } from './dto/get-user-filter.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signIn')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<UserInfoDto> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  getUserInfo(@Query() filterDto: GetUserFilteredDto): Promise<User> {
    return this.authService.getUserInfo(filterDto);
  }

  @Patch('/:id/password')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    const { password } = updateUserPasswordDto;
    return this.authService.updateUserPassword(id, password);
  }
}
