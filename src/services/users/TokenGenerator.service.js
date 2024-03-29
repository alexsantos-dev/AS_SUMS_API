import jwt from "jsonwebtoken"
import { configDotenv } from 'dotenv'

configDotenv()

export function tokenGenerator(id) {
    try {
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1m' })
        return token
    }
    catch (error) {
        console.error(error)
    }
}