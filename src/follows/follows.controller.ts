import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { Prisma } from '@prisma/client';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  create(@Body() createFollowDto: Prisma.FollowsCreateInput) {
    return this.followsService.create(createFollowDto);
  }

  @Get()
  findAll() {
    return this.followsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followsService.findOne(id);
  }

  // Renvoie le nombre de follower qu'un user a (qu'un followed a)
  @Get('followerNumber/:followed_id')
  findFollowerNumber(@Param('followed_id') followed_id: string) {
    return this.followsService.followerNumber(followed_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowDto: Prisma.FollowsUpdateInput) {
    return this.followsService.update(id, updateFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(id);
  }

}
