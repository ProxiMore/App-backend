import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Prisma } from '@prisma/client';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @Post()
  // create(@Body() createChatDto: Prisma.ChatCreateInput) {
  //   return this.chatsService.create(createChatDto);
  // }

  @Post()
  create(@Body() createChatDto: { name: string; user_id: string[] }) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(id);
  }

  // Renvoie tous les users d'un groupe de chat
  @Get('chatUsers/:chat_id')
  findChatUsers(@Param('chat_id') chat_id: string) {
    return this.chatsService.findChatUsers(chat_id);
  }

  // Renvoie tous les messages d'un groupe de chat
  @Get('chatMessages/:chat_id')
  findChatMessages(@Param('chat_id') chat_id: string) {
    return this.chatsService.findChatMessages(chat_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: Prisma.ChatsUpdateInput) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
