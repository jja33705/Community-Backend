import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<User> {
    const foundUser = await this.usersService.findOneByOption({
      where: {
        email: registerDto.email,
      },
    });

    if (foundUser) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }

    registerDto.password = this.encryptPassword(registerDto.password);

    return this.usersService.create(registerDto);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const foundUser = await this.usersService.findOneByOption({
      where: {
        email: email,
      },
    });

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      return foundUser;
    }

    return null;
  }

  login(user: User): LoginResponse {
    const payload = { id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
