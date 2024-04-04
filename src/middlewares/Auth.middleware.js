import jwt from "jsonwebtoken"
import { configDotenv } from 'dotenv'

configDotenv()

export function verifyTypeUser(requiredUserType) {
    return function authUser(req, res, next) {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Token not provided or invalid' })
            }

            const token = authHeader.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userType = decoded.typeUser

            if (!userType) {
                return res.status(403).json({ error: 'User type not found in token' })
            }

            if (userType !== requiredUserType) {
                return res.status(403).json({ error: `Forbidden: Not a ${requiredUserType} is ${userType}` })
            }

            req.typeUser = userType
            next()
        } catch (error) {
            return res.status(403).json({ error: 'Invalid token' })
        }
    }
}
