import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneByOption(options: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(options);
  }

  create(registerDto: RegisterDto): Promise<User> {
    return this.usersRepository.save(registerDto);
  }
}
