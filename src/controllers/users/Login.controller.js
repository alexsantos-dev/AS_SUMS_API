import { globalFindOneByReg } from '../../services/users/Finder.service.js'
import bcrypt from "bcrypt"
import { tokenGenerator } from '../../services/users/TokenGenerator.service.js'

export async function Login(req, res) {
    try {
        const { reg, password } = req.body

        const user = await globalFindOneByReg(reg)

        if (user) {
            const userPassword = user.password
            const checkPassword = await bcrypt.compare(password, userPassword)
            if (checkPassword) {
                const token = tokenGenerator(user.typeUser, user.id)
                res.status(200).json({ msg: 'User logged successfully!', token })
            } else {
                res.status(409).json({ error: 'Wrong password!' })
            }
        } else {
            res.status(404).json({ error: 'User not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}