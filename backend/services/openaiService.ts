import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateText(prompt: string) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message?.content ?? '';
}


// ========== backend/.env ==========
OPENAI_API_KEY=your_openai_key_here
PORT=3000