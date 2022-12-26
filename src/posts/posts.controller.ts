import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { GetOneParamsDto } from './dto/get-one-params.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get(':id')
  getOne(@Param() { id }: GetOneParamsDto) {
    return this.postsService.getOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: number)
}
