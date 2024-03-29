import { Router } from 'express'
import { Login } from '../../controllers/users/Login.controller.js'

const router = Router()

router.post('/login', Login)

export default { router }