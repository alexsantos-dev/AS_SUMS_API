import jwt from "jsonwebtoken"
import { configDotenv } from 'dotenv'

configDotenv()

export function tokenGenerator(typeUser) {
    try {
        const token = jwt.sign({ typeUser: typeUser }, process.env.JWT_SECRET, { expiresIn: '3m' })
        return token
    }
    catch (error) {
        console.error(error)
    }
}