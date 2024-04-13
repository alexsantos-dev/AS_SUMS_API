import jwt from "jsonwebtoken"
import { configDotenv } from 'dotenv'

configDotenv()

export function verifyTypeUser(requiredUserType) {
    return function authUser(req, res, next) {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ err: 'Token not provided or invalid' })
            }

            const token = authHeader.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userType = decoded.typeUser
            const userId = decoded.id
            const { id } = req.params
            if (userType !== requiredUserType) {
                return res.status(409).json({ err: 'type user unauthorized!' })
            }
            if (userId !== id) {
                return res.status(409).json({ err: 'id user unauthorized!' })

            }
            req.typeUser = userType
            req.id = userId
            next()
        } catch (error) {
            res.status(403).json({ Authorization: error })
        }
    }
}
