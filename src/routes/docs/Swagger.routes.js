import { Router } from 'express'
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../../../swagger.json" with {type: "json"}

const router = Router()

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument))

export default { router }