import { Router } from 'express'
import StudentsGradesControllers from '../../controllers/students/Students.grades.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'

const router = Router()

router.use(verifyTypeUser('std'))

router.get('/grades/:studentId', StudentsGradesControllers.findGradesByStudentId)

export default { router }
