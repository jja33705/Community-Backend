import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { GetOneParamsDto } from './dto/get-one-params.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get(':id')
  getOne(@Param() { id }: GetOneParamsDto) {
    return this.postsService.getOne(id);
  }
}
