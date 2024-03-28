import { Router } from 'express'
import TeachersControllers from '../../controllers/adimistration/Teachers.controllers.js'

const router = Router()

router.post('/', TeachersControllers.create)
router.get('/', TeachersControllers.findAll)
router.get('/reg/:reg', TeachersControllers.findOneByReg)
router.get('/id/:id', TeachersControllers.findOneById)
router.patch('/:reg', TeachersControllers.update)
router.delete('/:reg', TeachersControllers.erase)

export default { router }