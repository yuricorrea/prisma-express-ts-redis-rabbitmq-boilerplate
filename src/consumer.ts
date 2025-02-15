import config from './config/config';
import * as channels from './queue/channels';
import amqp from 'amqplib';
import { redis } from './config/redis';

const consumeMessages = async (queue: string) => {
  try {
    const conn = await amqp.connect(config.cache.rabbitMQ);
    const channel = await conn.createChannel();

    await channel.assertQueue(queue, { durable: true });
    console.log(`🚀 Waiting for messages in queue: ${queue}`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const { key, value } = JSON.parse(msg.content.toString());
        await redis.set(`${queue}:${key}`, value.toString(), { EX: config.cache.cacheTime });
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
};

Object.keys(channels).forEach((key) => consumeMessages((channels as any)[key]));
