import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.usersService.findOneByOption({
      where: {
        id: userId,
      },
    });

    const newPost = { ...createPostDto, user };

    return this.postsRepository.save(newPost);
  }

  getAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async getOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }
}
