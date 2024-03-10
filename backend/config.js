import dotenv from 'dotenv';

dotenv.config();

export const PORT = 5555;
export const mongourl = `${process.env.MONGO_URL}`;