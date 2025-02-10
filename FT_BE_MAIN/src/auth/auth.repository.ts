import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { GetUserFilteredDto } from './dto/get-user-filter.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exits');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<UserInfoDto> {
    let { username, password } = authCredentialsDto;
    username = username.toLowerCase();

    const user = await this.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      return { id: user.id, username, accessToken };
    } else {
      throw new UnauthorizedException('Invalid password or username');
    }
  }

  async getUserInfo(filterDto: GetUserFilteredDto) {
    let { id, username } = filterDto;
    const normalizedUsername = username ? username.toLowerCase() : undefined;
    let user = null;
    if (id || username) {
      user = await this.findOne({
        where: [{ id: id ?? undefined }, { username: normalizedUsername }],
      });
    }

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    return user;
  }

  async updateUser(id: string, password: string): Promise<User> {
    const filterDto: GetUserFilteredDto = {
      id,
    };
    const user = await this.getUserInfo(filterDto);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await this.save(user);

    return user;
  }
}
