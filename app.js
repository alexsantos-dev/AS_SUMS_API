import express from 'express'
import StudentsRoutes from './src/routes/administration/Students.routes.js'
import TeachersRoutes from './src/routes/administration/Teachers.routes.js'
import LoginRoute from './src/routes/users/Login.route.js'
import StudentsGradesRoutes from './src/routes/students/Students.grades.routes.js'
import TeachersGradesRoutes from './src/routes/teachers/Teachers.grades.routes.js'
import TeachersAttendancesRoutes from './src/routes/teachers/Teachers.attendances.routes.js'
import SwaggerRoutes from './src/routes/docs/Swagger.routes.js'
import { configDotenv } from 'dotenv'
import configureCors from './src/cors/Cors.config.js'

const app = express()

configDotenv()
configureCors(app)

app.use(express.json())
app.use('/adm/students', StudentsRoutes.router)
app.use('/adm/teachers', TeachersRoutes.router)
app.use('/usr', LoginRoute.router)
app.use('/tchr', TeachersGradesRoutes.router)
app.use('/tchr', TeachersAttendancesRoutes.router)
app.use('/std', StudentsGradesRoutes.router)
app.use('/doc', SwaggerRoutes.router)

export default app