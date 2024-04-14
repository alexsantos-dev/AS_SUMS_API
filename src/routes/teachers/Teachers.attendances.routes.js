import { Router } from 'express'
import TeachersAttendancesControllers from '../../controllers/teachers/Teachers.attendances.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'

const router = Router()

router.post('/attendance/:id', verifyTypeUser('tchr'), TeachersAttendancesControllers.registAttendance)

export default { router }