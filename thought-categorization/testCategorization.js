import 'dotenv/config';
import { categorizeThought } from './thoughtCategorization.js';

async function test() {
  const testThought = "I feel overwhelmed with everything going on.";
  const category = await categorizeThought(testThought);
  console.log(`Category: ${category}`);
}

test();
