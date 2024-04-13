import { Router } from 'express'
import StudentsControllers from '../../controllers/adimistration/Students.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'

const router = Router()

router.post('/:id', verifyTypeUser('adm'), StudentsControllers.create)
router.get('/:id', verifyTypeUser('adm'), StudentsControllers.findAll)
router.get('/std-reg/:id', verifyTypeUser('adm'), StudentsControllers.findOneByStudentReg)
router.get('/std-id/:id', verifyTypeUser('adm'), StudentsControllers.findOneByStudentId)
router.patch('/:id', verifyTypeUser('adm'), StudentsControllers.update)
router.delete('/:id', verifyTypeUser('adm'), StudentsControllers.erase)

export default { router }