import request from 'supertest'
import app from '../../../index.js'
import Grade from '../../models/grades/Grade.model.js'
import sequelize from '../../data/data.config.js'

describe('StudentsGradesControllers', () => {
    let stdToken
    let tchrToken
    let stdId
    const gradeData = {
        teacherId: '091e1f3c-898b-4900-ab91-853f69d99b28',
        studentId: '40d972e7-1dbe-4204-8e4d-da34f6dff278',
        disciplineId: '17029a7a-f388-4acd-a1ca-e44aad5f6238',
        periodId: 1,
        value: 8.5
    }
    stdId = gradeData.studentId
    beforeAll(async () => {
        await sequelize.sync()
        const studentLoginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'std-142518-24-JS',
                password: '7803-Aob'
            })

        stdToken = studentLoginResponse.body.token

        const teacherLoginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'tchr-231818-24-CS',
                password: 'tcher123'
            })

        tchrToken = teacherLoginResponse.body.token

        await request(app)
            .post('/tchr/grades')
            .send(gradeData)
            .set('Authorization', `Bearer ${tchrToken}`)
    })
    afterAll(async () => {
        await Grade.destroy({ where: { StudentId: '40d972e7-1dbe-4204-8e4d-da34f6dff278' } })
        await sequelize.close()
    })
    describe('GET findGradesByStudentId /std/grades/studentId', () => {
        it('should return status 200 and a grade', async () => {
            const res = await request(app)
                .get(`/std/grades/${stdId}`)
                .set('Authorization', `Bearer ${stdToken}`)
            expect(res.status).toBe(200)
            expect(res.body).toBeTruthy()
        })
        it('should return status 404 and error message', async () => {
            const res = await request(app)
                .get('/std/grades/testId')
                .set('Authorization', `Bearer ${stdToken}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('No grades found!')
        })
    })
})