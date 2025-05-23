import { openai } from './openaiClient.js';

export async function categorizeThought(thoughtText) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a mental health assistant. Categorize thoughts into:
        - Anxiety
        - Depression
        - Stress
        - Positive
        - Neutral`,
        },
        {
          role: 'user',
          content: `Thought: "${thoughtText}"\nCategory:`,
        },
      ],
      max_tokens: 10,
      temperature: 0,
    },
    {
      timeout: 5 * 1000,
    });

    const category = response.choices[0].message.content.trim();
    return category;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

