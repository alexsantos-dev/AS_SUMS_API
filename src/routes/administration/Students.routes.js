import { Router } from 'express'
import StudentsControllers from '../../controllers/adimistration/Students.controllers.js'

const router = Router()

router.post('/students', StudentsControllers.addStudent)
router.get('/students', StudentsControllers.searchStudents)

export default { router }