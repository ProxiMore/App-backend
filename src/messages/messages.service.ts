import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MessagesService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createMessageDto: Prisma.MessagesCreateInput) {
    return this.databaseService.messages.create({
        data: createMessageDto
    });
  }

  async findAll() {
    return this.databaseService.messages.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.messages.findUnique({
        where: { id },
    });  
  }

  async findByContent( _chat_id: string, _content: string ) {

    if (_chat_id != null){
      
      return this.databaseService.messages.findMany({
        where: { 
          content: { 
            contains: _content,
            mode: 'insensitive',
          },
          chat_id: _chat_id
        },
        orderBy: {
          created_at: 'desc',
        }
      })

    }
  }

  async update(id: string, updateMessageDto: Prisma.MessagesUpdateInput) {
    return this.databaseService.messages.update({
        where: { id },
        data: updateMessageDto,
      });
  }

  async remove(id: string) {
    return this.databaseService.messages.delete({
        where: { id },
      });
  }
}
