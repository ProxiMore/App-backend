import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UsersCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Renvoie les users dont le username contient le string de recherche
  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  // Renvoie les posts d'un user
  @Get('userPosts/:user_id')
  findUserPosts(@Param('user_id') user_id: string) {
    return this.usersService.findUserPosts(user_id);
  }

  // Renvoie tous les groupes de chat de l'user
  @Get('userChats/:user_id')
  findUserChats(@Param('user_id') user_id: string) {
    return this.usersService.findUserChats(user_id);
  }

  // Renvoie tous les follows de l'user (V.1: Renvoie tous les users suivis par l'user)
  @Get('userFollows/:user_id')
  findUserFollows(@Param('user_id') user_id: string) {
    return this.usersService.findUserFollows(user_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UsersUpdateInput) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
