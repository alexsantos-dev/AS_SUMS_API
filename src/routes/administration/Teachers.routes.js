import { Router } from 'express'
import TeachersControllers from '../../controllers/adimistration/Teachers.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'
const router = Router()

router.post('/:id', verifyTypeUser('adm'), TeachersControllers.create)
router.get('/:id', verifyTypeUser('adm'), TeachersControllers.findAll)
router.get('/tchr-reg/:id', verifyTypeUser('adm'), TeachersControllers.findOneByTeacherReg)
router.get('/tchr-id/:id', verifyTypeUser('adm'), TeachersControllers.findOneByTeacherId)
router.patch('/:id', verifyTypeUser('adm'), TeachersControllers.update)
router.delete('/:id', verifyTypeUser('adm'), TeachersControllers.erase)

export default { router }