import { OPENAI_API_KEY } from '@env';

export async function categorizeThought(thoughtText) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a mental health assistant. Categorize thoughts into:
        - Anxiety
        - Depression
        - Stress
        - Positive
        - Anger
        - Fear
        - Guilt
        - Shame
        - Grief
        - Loneliness
        - Hopelessness
        - Self-doubt
        - Motivation
        - Gratitude
        - Happiness
        - Excitement
        - Love
        - Jealousy
        - Frustration 
        - Overwhelm
        - Boredom
        - Regret
        - Embarrassment
        - Resentment
        - Contentment
        - Pride
        - Inspiration
        - Worry
        - Sadness
        - Disappointment
        - Relief
        - Acceptance
        - Anticipation
        - Empathy
        - Compassion
        - Curiosity
        - Hope`,
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
      })
    });

    const data = await response.json();
    const category = data.choices?.[0]?.message?.content?.trim();
    //if (category === 'The thought "undefined" does not provide enough context') {
     // throw new Error("Sorry, I couldn't categorize your thought. Please try rephrasing or adding more detail.");
    //}
    return category;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

