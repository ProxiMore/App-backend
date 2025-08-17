import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostsService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createPostDto: Prisma.PostsCreateInput) {
    return this.databaseService.posts.create({
        data: createPostDto
    });
  }

  async findAll() {
    const posts = await this.databaseService.posts.findMany({
      include: {
        user: true
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return posts.map(post => ({
      title: post.title,
      address: post.address,
      content: post.content,
      user: {
        user_id: post.user?.id,
        username: post.user?.username,
        profile_picture_uri: post.user?.profile_picture_uri,
        bio: post.user?.bio,
        created_at: post.user?.created_at,
      },
      created_at: post.created_at,
      updated_at: post.updated_at,
      mediaUri: post.mediaUri,
    }));
  }

  async findOne(id: string) {
    const post = await this.databaseService.posts.findUnique({
      where: { id },
      include: {
        user: true
      },
    });

    return {
      title: post.title,
      address: post.address,
      content: post.content,
      user: {
        user_id: post.user?.id,
        username: post.user?.username,
        profile_picture_uri: post.user?.profile_picture_uri,
        bio: post.user?.bio,
        created_at: post.user?.created_at,
      },
      created_at: post.created_at,
      updated_at: post.updated_at,
      mediaUri: post.mediaUri,
    };
  }

  async findByContent(search: string){
    const posts = await this.databaseService.posts.findMany({
      where: { 
        content: { 
          contains: search,
          mode: 'insensitive',
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true
      },
    })
    
    return posts.map(post => ({
      title: post.title,
      address: post.address,
      content: post.content,
      user: {
        user_id: post.user?.id,
        username: post.user?.username,
        profile_picture_uri: post.user?.profile_picture_uri,
        bio: post.user?.bio,
        created_at: post.user?.created_at,
      },
      created_at: post.created_at,
      updated_at: post.updated_at,
      mediaUri: post.mediaUri,
    }));
  }

  async update(id: string, updatePostDto: Prisma.PostsUpdateInput) {
    return this.databaseService.posts.update({
        where: { id },
        data: updatePostDto,
      });
  }

  async remove(id: string) {
    return this.databaseService.posts.delete({
        where: { id },
      });
  }
}
