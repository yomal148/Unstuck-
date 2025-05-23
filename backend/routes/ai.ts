import express from 'express';
import { generateText } from 

const router = express.Router();

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const text = await generateText(prompt);
    res.json({ text });
  } catch (error) {
    console.error('AI error:', error);
    res.status(500).json({ error: 'AI generation failed' });
  }
});

export default router;