import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
// import { LikesModule } from './likes/likes.module';
// import { MusicsModule } from './musics/musics.module';
// import { TextsModule } from './texts/texts.module';
// import { AlbumsModule } from './albums/albums.module';
import { FollowsModule } from './follows/follows.module';
import { AuthModule } from './auth/auth.module';
// import { CommentsModule } from './comments/comments.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
        DatabaseModule, 
        UsersModule, 
        PostsModule,
        AuthModule,
        FollowsModule,
        ChatsModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

