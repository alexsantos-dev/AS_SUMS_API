import { Router } from 'express'
import StudentsGradesControllers from '../../controllers/students/Students.grades.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'

const router = Router()

router.get('/grades/:id', verifyTypeUser('std'), StudentsGradesControllers.findGradesByStudentId)

export default { router }
