import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {

    constructor(private readonly databaseService: DatabaseService) {}

    async create(createUserDto: Prisma.UsersCreateInput): Promise<Users> {
        return this.databaseService.users.create({
            data: createUserDto
        })
    }

    async findAll(): Promise<Users[]> {
        return this.databaseService.users.findMany();
      }

    async findOne(id: string): Promise<Users | null> {
        return this.databaseService.users.findUnique({
            where: { id },
        });
    }

    async findOneByEmail(email: string): Promise<Users | null> {
        return this.databaseService.users.findUnique({ 
            where: { email }
        });
    }

    async findByUsername(_username: string) {
      return this.databaseService.users.findMany({
        where: { 
          username: {
            contains: _username,
            mode: 'insensitive',
          },
        },
        orderBy: {
          created_at: 'desc',
        }
      })
    }

    async findUserPosts(_user_id: string) {
      return this.databaseService.posts.findMany({
        where: { 
          user_id: _user_id
        },
        orderBy : {
          created_at: 'desc',
        }
      })
    }

    async findUserChats(_user_id: string) {
      const user_chats = await this.databaseService.users_chats.findMany({
        where: { 
          user_id: _user_id
        },
      })
  
      if (user_chats.length === 0) return [];
  
      const chatIds = user_chats.map(c => c.chat_id);
  
      return this.databaseService.chats.findMany({
        where: { 
          id: { in: chatIds  }
        },
        orderBy : { created_at: 'desc', }
      })
    }

    async findUserFollows(_user_id: string) {

      const follows = await this.databaseService.follows.findMany({
        where: {
          follower_id: _user_id
      },
        select: { followed_id: true }
      })

      if (follows.length === 0) return [];

      const followsIds = follows.map(f => f.followed_id);

      return this.databaseService.users.findMany({
        where: { 
          id: { in: followsIds  }
        },
        orderBy : { username: 'asc', }
      })
    }

    async update(id: string, updateUserDto: Prisma.UsersUpdateInput): Promise<Users> {
        return this.databaseService.users.update({
          where: { id },
          data: updateUserDto,
        });
      }
    
      async remove(id: string): Promise<Users> {
        return this.databaseService.users.delete({
          where: { id },
        });
      }
}
