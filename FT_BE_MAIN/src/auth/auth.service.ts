import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { GetUserFilteredDto } from './dto/get-user-filter.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './user.entity';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<UserInfoDto> {
    return this.authRepository.signIn(authCredentialsDto);
  }

  async getUserInfo(filterDto: GetUserFilteredDto): Promise<User> {
    return this.authRepository.getUserInfo(filterDto);
  }

  async updateUserPassword(id: string, password: string): Promise<User> {
    return await this.authRepository.updateUser(id, password);
  }
}
