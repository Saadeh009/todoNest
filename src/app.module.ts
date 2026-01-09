import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [NotesModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
