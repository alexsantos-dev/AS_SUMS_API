import express from 'express'
import sequelize from './src/data/Data.config.js'
import StudentsRoutes from './src/routes/administration/Students.routes.js'
import TeachersRoutes from './src/routes/administration/Teachers.routes.js'
import { configDotenv } from 'dotenv'
import configureCors from './src/cors/Cors.config.js'

const app = express()
const PORT = process.env.PORT || 3000

configDotenv()
configureCors(app)

app.use(express.json())
app.use('/adm/students', StudentsRoutes.router)
app.use('/adm/teachers', TeachersRoutes.router)

app.listen(PORT, async () => {
    await sequelize.sync()
    console.log(`connected ✅ Port: ${PORT}`)
})
