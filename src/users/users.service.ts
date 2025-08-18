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

      const userChats = await this.databaseService.users_chats.findMany({
        where: { user_id: _user_id },
      });

      if (userChats.length === 0) return [];

      const chatIds = userChats.map(uc => uc.chat_id);

      const chats = await this.databaseService.chats.findMany({
        where: { id: { in: chatIds } },
        orderBy: { created_at: 'desc' },
      });

      const allUserChats = await this.databaseService.users_chats.findMany({
        where: { chat_id: { in: chatIds } },
        include: { user: true },
      });

      return chats.map(chat => {
        const currentUserChat = allUserChats.find(
          uc => uc.chat_id === chat.id && uc.user_id === _user_id
        );

        const otherUserChats = allUserChats
          .filter(uc => uc.chat_id === chat.id && uc.user_id !== _user_id)
          .map(uc => ({
            user_chat_name: uc.user_chat_name,
            user_id: uc.user?.id,
            username: uc.user?.username,
            profile_picture_uri: uc.user?.profile_picture_uri,
            bio: uc.user?.bio,
            created_at: uc.user?.created_at,
          }));

        return {
          id: chat.id,
          name: chat.name,
          is_group: chat.is_group,
          created_at: chat.created_at,
          user_chats: { id: currentUserChat.id, user_chat_name: currentUserChat?.user_chat_name ?? null },
          other_user_chats: otherUserChats,
        };
      });
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
