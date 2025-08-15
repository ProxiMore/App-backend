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

  findAll() {
    return this.databaseService.posts.findMany();
  }

  findOne(id: string) {
    return this.databaseService.posts.findUnique({
        where: { id },
    });  
  }

  findByContent(search: string){
    return this.databaseService.posts.findMany({
      where: { 
        content: { 
          contains: search,
          mode: 'insensitive',
        },
       },
       orderBy: {
        created_at: 'desc',
       }
    })
  }

  update(id: string, updatePostDto: Prisma.PostsUpdateInput) {
    return this.databaseService.posts.update({
        where: { id },
        data: updatePostDto,
      });
  }

  remove(id: string) {
    return this.databaseService.posts.delete({
        where: { id },
      });
  }
}
