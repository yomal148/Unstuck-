// insertUser.js
import { insertUser } from './db.js'

const main = async () => {
  try {
    const newUser = await insertUser({
      email: 'user@example.com',
      number: '+1234567890',
      name: 'Jane Doe',
    })
    console.log('Inserted:', newUser)
  } catch (err) {
    console.error('Error:', err.message)
  }
}

main()
