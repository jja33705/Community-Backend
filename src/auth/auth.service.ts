import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const foundUser = await this.usersService.findOneByOption({
      where: {
        email: loginDto.email,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('존재하지 않는 이메일입니다.');
    }

    if (!bcrypt.compareSync(loginDto.password, foundUser.password)) {
      throw new BadRequestException('비밀번호가 잘못됐습니다.');
    }

    const payload = { id: foundUser.id, email: foundUser.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
