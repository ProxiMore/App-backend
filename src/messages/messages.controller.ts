import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Prisma } from '@prisma/client';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: Prisma.MessagesCreateInput) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('11111');
    return this.messagesService.findOne(id);
  }

  // Renvoie les messages qui contiennent le string de recherche
  @Get('content/:content')
  findByContent(@Param('content') content: string, @Query('chat_id') chat_id: string) {
    console.log('22222');
    return this.messagesService.findByContent(chat_id, content);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: Prisma.MessagesUpdateInput) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
