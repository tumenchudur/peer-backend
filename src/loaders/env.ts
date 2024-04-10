import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync(`.env`)) dotenv.config({ path: `.env` })
else {
    const { error } = dotenv.config({ path: '.env.example' })
    if (error) throw new Error('No ".env" or ".env.example" file found!')
    console.log('No ".env" file found. Temporarily using the ".env.example" file!') // eslint-disable-line no-console
}

export default {}
