import { Router } from 'express'
import StudentsControllers from '../../controllers/adimistration/Students.controllers.js'

const router = Router()

router.post('/students', StudentsControllers.create)
router.get('/students', StudentsControllers.findAll)
router.post('/students/reg', StudentsControllers.findOneByReg)

export default { router }