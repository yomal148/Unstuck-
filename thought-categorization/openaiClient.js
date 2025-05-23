import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

export const openai = new OpenAI({
  timeout: 20 * 1000, // 20 seconds (default is 10 minutes)
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

