import jwt from "jsonwebtoken"
import { configDotenv } from 'dotenv'

configDotenv()

export function tokenGenerator(typeUser, id) {
    try {
        const token = jwt.sign({ typeUser: typeUser, id: id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        return token
    }
    catch (error) {
        console.error(error)
    }
}