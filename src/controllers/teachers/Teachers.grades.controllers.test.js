import request from 'supertest'
import app from '../../../index.js'
import sequelize from '../../data/Data.config.js'
import Grade from '../../models/grades/Grade.model.js'

describe('TeachersGradesControllers', () => {
    let token
    beforeAll(async () => {
        await sequelize.sync()
        const loginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'tchr-370616-24-CS',
                password: 'tcher123'
            })

        token = loginResponse.body.token
    })
    afterEach(async () => {
        await Grade.destroy({ where: { StudentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6' } })
    })
    afterAll(async () => {
        await sequelize.close()
    })
    describe('POST addGrade /tchr/grades', () => {
        const gradeData = {
            teacherId: '9b12c5df-a276-4bfc-b50e-178aa550abf7',
            studentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6',
            disciplineId: '17029a7a-f388-4acd-a1ca-e44aad5f6238',
            periodId: 1,
            value: 8.5
        }

        it('should respond with 200 and success message when grade is added successfully', async () => {
            const res = await request(app)
                .post('/tchr/grades')
                .send(gradeData)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Grade added successfully!')
            expect(res.body.gradeId).toBeTruthy()
        })

        it('should respond with 409 and error message if period was already added for this student', async () => {
            await request(app)
                .post('/tchr/grades')
                .send(gradeData)
                .set('Authorization', `Bearer ${token}`)
            const res = await request(app)
                .post('/tchr/grades')
                .send(gradeData)
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Period was added for this student!')
        })
        it('should respond with 406 and error message when the note does not have all the fields', async () => {
            const gradePartial = {
                teacherId: '9b12c5df-a276-4bfc-b50e-178aa550abf7',
                studentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6',
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

    describe('PATCH editGrade /tchr/grades/:id', () => {
        let id
        beforeEach(async () => {
            const gradeData = {
                teacherId: '9b12c5df-a276-4bfc-b50e-178aa550abf7',
                studentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6',
                disciplineId: '17029a7a-f388-4acd-a1ca-e44aad5f6238',
                periodId: 3,
                value: 8.5
            }
            let createdData = await request(app)
                .post('/tchr/grades')
                .send(gradeData)
                .set('Authorization', `Bearer ${token}`)
            id = createdData.body.gradeId
        })

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
                value: false
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
    describe('GET findGradeById /tchr/grades/:id', () => {
        let id
        beforeEach(async () => {
            const gradeData = {
                teacherId: '9b12c5df-a276-4bfc-b50e-178aa550abf7',
                studentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6',
                disciplineId: '17029a7a-f388-4acd-a1ca-e44aad5f6238',
                periodId: 3,
                value: 8.5
            }
            let createdData = await request(app)
                .post('/tchr/grades')
                .send(gradeData)
                .set('Authorization', `Bearer ${token}`)
            id = createdData.body.gradeId
        })

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
})
