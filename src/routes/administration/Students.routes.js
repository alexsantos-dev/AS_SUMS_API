import { Router } from 'express'
import StudentsControllers from '../../controllers/adimistration/Students.controllers.js'
import { verifyTypeUser } from '../../middlewares/Auth.middleware.js'
const router = Router()

router.use(verifyTypeUser('adm'))

router.post('/', StudentsControllers.create)
router.get('/', StudentsControllers.findAll)
router.get('/reg/:reg', StudentsControllers.findOneByReg)
router.get('/id/:id', StudentsControllers.findOneById)
router.patch('/:reg', StudentsControllers.update)
router.delete('/:reg', StudentsControllers.erase)

export default { router }