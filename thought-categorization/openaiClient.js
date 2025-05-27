import dotenv from 'dotenv';
import OpenAI from 'openai';

// Resolve the path to the .env file in the current directory
dotenv.config();

export const openai = new OpenAI({
  timeout: 20 * 1000, // 20 seconds (default is 10 minutes)
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

