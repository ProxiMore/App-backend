import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ChatsService {

  constructor(private readonly databaseService: DatabaseService) {}
    
  // async create(createChatDto: Prisma.ChatCreateInput) {
  //   return this.databaseService.chat.create({
  //     data: createChatDto
  //   });
  // }

  // login(loginDto: { email: string; password: string }): Promise<{ access_token: string }>

  async create(createChatDto: { name: string; user_id: string[] }){

    let dataChat: Prisma.ChatsCreateInput;

    if ( createChatDto.user_id.length == 2 ) {
      dataChat = {
        name: createChatDto.name,
        is_group: false
      };
    }
    else if ( createChatDto.user_id.length > 2 ) {
      dataChat = {
        name: createChatDto.name,
        is_group: true
      };
    }

    const chatRes = await this.databaseService.chats.create({ data: dataChat });

    let users = createChatDto.user_id.map((id) => ({
      user_id: id,
      chat_id: chatRes.id
    }))

    const dataUserChat = await this.databaseService.users_chats.createMany({ data: users });
    
    return { chat: chatRes,
      userChat: dataUserChat
    }

  }

  async findAll() {
    const chats = await this.databaseService.chats.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    if (chats.length === 0) return [];

    const chatsId = chats.map(c => c.id);

    const user_chats = await this.databaseService.users_chats.findMany({
      where: {
        chat_id: {in: chatsId}
      },
      include: {
        user: true,
      }
    })

    return chats.map(chat => ({
      name: chat.name,
      is_group: chat.is_group,
      created_at: chat.created_at,
      user_chats: user_chats.filter(user_chat => user_chat.chat_id === chat.id).map(user_chat=> ({
        user_chat_name: user_chat.user_chat_name,
        user_id: user_chat.user?.id,
        username: user_chat.user?.username,
        profile_picture_uri: user_chat.user?.profile_picture_uri,
        bio: user_chat.user?.bio,
        created_at: user_chat.user?.created_at,
      }))
    }));
  }

  async findOne(id: string) {
    const chat = await this.databaseService.chats.findUnique({
        where: { id },
    });

    const user_chats = await this.databaseService.users_chats.findMany({
      where: {
        chat_id: chat.id
      },
      include: {
        user: true,
      }
    })

    return {
      name: chat.name,
      is_group: chat.is_group,
      created_at: chat.created_at,
      user_chats: user_chats.filter(user_chat => user_chat.chat_id === chat.id).map(user_chat=> ({
        user_chat_name: user_chat.user_chat_name,
        user_id: user_chat.user?.id,
        username: user_chat.user?.username,
        profile_picture_uri: user_chat.user?.profile_picture_uri,
        bio: user_chat.user?.bio,
        created_at: user_chat.user?.created_at,
      }))
    };
  }

  async findChatUsers(_chat_id: string) {
    const user_chats = await this.databaseService.users_chats.findMany({
      where: { 
        chat_id: _chat_id
      },
    })

    if (user_chats.length === 0) return [];

    const usersId = user_chats.map(u => u.user_id);

    return this.databaseService.users.findMany({
      where: { 
        id: { in: usersId  }
      },
      orderBy : {
        created_at: 'desc',
      }
    })
  }

  async findChatMessages(_chat_id: string) {
    return this.databaseService.messages.findMany({
      where: { 
        chat_id: _chat_id
      },
      orderBy : {
        created_at: 'desc',
      }
    })
  }

  async update(id: string, updateChatDto: Prisma.ChatsUpdateInput) {
    return this.databaseService.chats.update({
        where: { id },
        data: updateChatDto,
      });
  }

  async remove(id: string) {
    return this.databaseService.chats.delete({
        where: { id },
      });
  }
}
