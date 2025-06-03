// insert-user-thought.js
import { insertUserThought } from "./db.js"

const main = async () => {
  try {
    const newUserThought = await insertUserThought({
      thought: 'Test Thought for Anxiety',
      category: 'Anxiety',
    })
    console.log('Inserted:', newUserThought)
  } catch (err) {
    console.error('Error:', err.message)
  }
}

main()