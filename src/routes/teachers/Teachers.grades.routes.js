import { Router } from 'express'
import TeachersGradesControllers from '../../controllers/teachers/Teachers.grades.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'

const router = Router()

router.post('/grades/:id', verifyTypeUser('tchr'), TeachersGradesControllers.addGrade)
router.patch('/grades/:id', verifyTypeUser('tchr'), TeachersGradesControllers.editGrade)
router.get('/grades/:id', verifyTypeUser('tchr'), TeachersGradesControllers.findGradeById)


export default { router }