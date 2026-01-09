import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis

  onModuleInit() {
    this.client = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379')
  }

  async onModuleDestroy() {
    await this.client.quit()
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<'OK' | null> {
    const payload = typeof value === 'string' ? value : JSON.stringify(value)

    if (ttlSeconds) {
      return this.client.set(key, payload, 'EX', ttlSeconds)
    }

    return this.client.set(key, payload)
  }

  async get(key: string): Promise<any | null> {
    const val = await this.client.get(key)
    if (!val) return null

    try {
      return JSON.parse(val)
    } catch {
      return val
    }
  }

  async del(key: string): Promise<number> {
    return this.client.del(key)
  }

  async keys(pattern = '*'): Promise<string[]> {
    return this.client.keys(pattern)
  }
}
