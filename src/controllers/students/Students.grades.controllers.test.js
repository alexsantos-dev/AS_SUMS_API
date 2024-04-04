import request from 'supertest'
import app from '../../../index.js'
import Grade from '../../models/grades/Grade.model.js'
import sequelize from '../../data/Data.config.js'

describe('StudentsGradesControllers', () => {
    let stdToken
    let tchrToken
    let stdId
    const gradeData = {
        teacherId: '9b12c5df-a276-4bfc-b50e-178aa550abf7',
        studentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6',
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
                reg: 'std-270616-24-JS',
                password: '7803-Aob'
            })

        stdToken = studentLoginResponse.body.token

        const teacherLoginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'tchr-370616-24-CS',
                password: 'tcher123'
            })

        tchrToken = teacherLoginResponse.body.token
    })
    beforeEach(async () => {
        const createdData = await request(app)
            .post('/tchr/grades')
            .send(gradeData)
            .set('Authorization', `Bearer ${tchrToken}`)
    })
    afterEach(async () => {
        await Grade.destroy({ where: { StudentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6' } })
    })
    afterAll(async () => {
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
                .get('/std/grades/invalidId')
                .set('Authorization', `Bearer ${stdToken}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('No grades found!')
        })
    })
})