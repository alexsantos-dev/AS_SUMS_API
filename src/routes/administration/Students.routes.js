import { Router } from 'express'
import StudentsControllers from '../../controllers/adimistration/Students.controllers.js'

const router = Router()

router.post('/students', StudentsControllers.create)
router.get('/students', StudentsControllers.findAll)
router.get('/students/reg/:reg', StudentsControllers.findOneByReg)
router.get('/students/id/:id', StudentsControllers.findOneById)
router.patch('/students/:reg', StudentsControllers.update)
router.delete('/students/:reg', StudentsControllers.erase)

export default { router }