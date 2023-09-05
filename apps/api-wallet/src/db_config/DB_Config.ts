import { registerAs } from '@nestjs/config';

export default registerAs('wallet_mini_project', () => ({
    user: process.env.DATABASE_ROOT,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    connectionLimit: 1000,
    socketPath: null,
}))