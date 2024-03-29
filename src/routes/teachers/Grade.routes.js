import { Router } from 'express'
import GradeControllers from '../../controllers/teachers/Grade.controllers.js'

const router = Router()

router.post('/grades', GradeControllers.addGrade)
router.patch('/grades/:id', GradeControllers.editGrade)
router.get('/grades/:id', GradeControllers.findGradeById)

export default { router }