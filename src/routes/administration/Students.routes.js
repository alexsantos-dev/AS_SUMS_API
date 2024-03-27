import { Router } from 'express'
import StudentsControllers from '../../controllers/adimistration/Students.controllers.js'

const router = Router()

router.post('/students', StudentsControllers.create)
router.get('/students', StudentsControllers.findAll)
router.get('/students/:reg', StudentsControllers.findOneByReg)
router.delete('/students/:reg', StudentsControllers.erase)

export default { router }