import { RedisClientType, createClient } from 'redis';

const client: RedisClientType = createClient();

client.on('error', (err) => {
  console.log('Error ' + err);
});

client.on('connect', () => {
  console.log('Redis client connected');
});

export default client;

