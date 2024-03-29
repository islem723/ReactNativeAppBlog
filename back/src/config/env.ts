import { config } from 'dotenv';

config();

export const JWT_SECRET = `${process.env.JWT_SECRET}`;
export const JWT_EXPIRATION = `${process.env.JWT_EXPIRATION}`;
export const HASH_ROUNDS = `${process.env.HASH_ROUNDS}`;
export const PORT = Number.parseInt(`${process.env.PORT}`) || 3000;
