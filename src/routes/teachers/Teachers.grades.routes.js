import { Router } from 'express'
import TeachersGradesControllers from '../../controllers/teachers/Teachers.grades.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'

const router = Router()

router.use(verifyTypeUser('tchr'))

router.post('/grades', TeachersGradesControllers.addGrade)
router.patch('/grades/:id', TeachersGradesControllers.editGrade)
router.get('/grades/:id', TeachersGradesControllers.findGradeById)


export default { router }