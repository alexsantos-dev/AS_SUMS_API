import { Router } from 'express'
import StudentsGradesControllers from '../../controllers/students/Students.grades.controllers.js'

const router = Router()

router.get('/grades/:studentId', StudentsGradesControllers.findGradesByStudentId)

export default { router }
