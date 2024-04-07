import request from 'supertest'
import app from '../../../index.js'
import sequelize from '../../data/Data.config.js'
import Grade from '../../models/grades/Grade.model.js'

describe('TeachersGradesControllers', () => {
    let token
    let createdData
    let id
    const gradeData = {
        teacherId: '091e1f3c-898b-4900-ab91-853f69d99b28',
        studentId: '374fbf39-1c31-4727-8128-644e67c3cfb0',
        disciplineId: '17029a7a-f388-4acd-a1ca-e44aad5f6238',
        periodId: 1,
        value: 8.5
    }
    beforeAll(async () => {
        await sequelize.sync()
        const loginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'tchr-231818-24-CS',
                password: 'tcher123'
            })
        token = loginResponse.body.token

        createdData = await request(app)
            .post('/tchr/grades')
            .send(gradeData)
            .set('Authorization', `Bearer ${token}`)

        id = createdData.body.gradeId
    })

    afterAll(async () => {
        await Grade.destroy({ where: { StudentId: '374fbf39-1c31-4727-8128-644e67c3cfb0' } })
        await sequelize.close()
    })
    describe('POST addGrade /tchr/grades', () => {
        it('should respond with 200 and success message when grade is added successfully', async () => {
            const res = createdData
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Grade added successfully!')
            expect(res.body.gradeId).toBeTruthy()
        })

        it('should respond with 409 and error message if period was already added for this student', async () => {
            createdData = await request(app)
                .post('/tchr/grades')
                .send(gradeData)
                .set('Authorization', `Bearer ${token}`)
            const res = createdData
            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Period was added for this student!')
        })
        it('should respond with 406 and error message when the note does not have all the fields', async () => {
            const gradePartial = {
                teacherId: '091e1f3c-898b-4900-ab91-853f69d99b28',
                studentId: '374fbf39-1c31-4727-8128-644e67c3cfb0',
                periodId: 1,
                value: 8.5
            }
            const res = await request(app)
                .post('/tchr/grades')
                .send(gradePartial)
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(406)
            expect(res.body.err).toBe('Send all fields to add grade!')
        })
    })

    describe('GET findGradeById /tchr/grades/:id', () => {
        it('should return status 200, a grade and success message while find a grade', async () => {
            const res = await request(app)
                .get(`/tchr/grades/${id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body).toBeTruthy()
        })
        it('should return status 404, a grade and error message while find a grade', async () => {
            const res = await request(app)
                .get(`/tchr/grades/testId`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Grade not found!')
        })
    })
    describe('PATCH editGrade /tchr/grades/:id', () => {
        it('should return status 200 and success message when editing the grade', async () => {
            const field = {
                value: 10
            }
            const res = await request(app)
                .patch(`/tchr/grades/${id}`)
                .send(field)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Grade updated successfully')
        })
        it('should return status 400 and error message when editing the grade', async () => {
            const field = {
                "": ""
            }
            const res = await request(app)
                .patch(`/tchr/grades/${id}`)
                .send(field)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('Update contains invalid fields!')
        })
        it('should return status 404 and error message when editing the grade', async () => {
            const field = {
                value: 10
            }
            const res = await request(app)
                .patch(`/tchr/grades/testId`)
                .send(field)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Grade not found!')
        })
    })
})
