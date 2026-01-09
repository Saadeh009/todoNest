import { Injectable } from '@nestjs/common'
import { RedisService } from '../redis/redis.service'

@Injectable()
export class NotesService {
  constructor(private readonly redis: RedisService) {}

  async createNote(id: string, content: string) {
    return await this.redis.set(`note:${id}`, content)
  }

  async getNote(id: string) {
    return await this.redis.get(`note:${id}`)
  }

  async getAllNotes() {
    // Use Redis SCAN or maintain a separate list
    const keys = await this.redis.keys('note:*')
    return Promise.all(keys.map(key => this.redis.get(key)))
  }

  async deleteNote(id: string) {
    return await this.redis.del(`note:${id}`)
  }
}