// insertUser.js
import { insertUser } from './db.js'

const main = async () => {
  try {
    const newUser = await insertUser({
      email: 'user@example2.com',
      number: '+1234567891',
      name: 'Jack Doe',
    })
    console.log('Inserted:', newUser)
  } catch (err) {
    console.error('Error:', err.message)
  }
}

main()
