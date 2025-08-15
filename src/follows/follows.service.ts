import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FollowsService {

  constructor(private readonly databaseService: DatabaseService) {}
    
  async create(createFollowDto: Prisma.FollowsCreateInput) {
    return this.databaseService.follows.create({
      data: createFollowDto
    });
  }

  async findAll() {
    return this.databaseService.follows.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.follows.findUnique({
        where: { id },
    });
  }

  async followerNumber(_followed_id: string) {
    return this.databaseService.follows.count({
      where: { 
        followed_id: _followed_id
      },
      orderBy : { created_at: 'desc' }
    });
  }

  async update(id: string, updatefollowDto: Prisma.FollowsUpdateInput) {
    return this.databaseService.follows.update({
        where: { id },
        data: updatefollowDto,
      });
  }

  async remove(id: string) {
    return this.databaseService.follows.delete({
        where: { id },
      });
  }

}
