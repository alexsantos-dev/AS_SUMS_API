import sequelize from '../../data/data.config.js'
import request from 'supertest'
import Student from '../../models/users/Student.model.js'
import app from '../../../index.js'

describe('StudentsControllers', () => {
    let token
    let createdStudent
    const studentData = {
        name: "teste a",
        sex: "m",
        phone: "12-131236478",
        email: "testea@gamail.com",
        password: "7803-Aob",
        classRoom: "301"
    }
    beforeAll(async () => {
        await sequelize.sync()
        const studentLoginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'adm-524018-24-DA',
                password: '7803-Aob'
            })

        token = studentLoginResponse.body.token

        createdStudent = await request(app)
            .post('/adm/students')
            .send(studentData)
            .set('Authorization', `Bearer ${token}`)
    })
    afterAll(async () => {
        await Student.destroy({ where: { email: 'testea@gamail.com' } })
        await sequelize.close()
    })

    describe('POST create /adm/students', () => {
        it('should return status 200 and sucess message', async () => {
            const res = createdStudent
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Student added successfully!')
        })
        it('should return status 409 and a error message', async () => {
            const testStudent = {}
            const res = await request(app)
                .post('/adm/students')
                .send(testStudent)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Send all fields for add student!')
        })
    })
    describe('GET findOneByReg /adm/students/reg/:reg', () => {
        it('should return status 200 and a student', async () => {
            const res = await request(app)
                .get(`/adm/students/reg/${createdStudent.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.Student).toBeTruthy()
        })
        it('should return status 404 and error message', async () => {

            const res = await request(app)
                .get('/adm/students/reg/testReg')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Student not found!')
        })
    })
    describe('GET findOneById /adm/students/id/:id', () => {
        it('should return status 200 and a student', async () => {

            const res = await request(app)
                .get(`/adm/students/id/${createdStudent.body.result.id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.Student).toBeTruthy()
        })
        it('should return status 404 and error message', async () => {
            const res = await request(app)
                .get('/adm/students/id/testID')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Student not found!')
        })
    })
    describe('PATCH update /adm/students/:reg', () => {
        it('should return status 200 and sucess message', async () => {

            const fields = {
                classRoom: "301"
            }
            const res = await request(app)
                .patch(`/adm/students/${createdStudent.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
                .send(fields)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Student updated successfully!')
        })
        it('should return status 409 and error message', async () => {

            const fields = {
                "": ""
            }
            const res = await request(app)
                .patch(`/adm/students/${createdStudent.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
                .send(fields)
            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Update contains invalid fields!')
        })
        it('should return status 404 and error message', async () => {
            const fields = {
                classRoom: "303"
            }
            const res = await request(app)
                .patch('/adm/students/testReg')
                .set('Authorization', `Bearer ${token}`)
                .send(fields)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Student not found!')
        })
    })
    describe('DELETE erase /adm/students:reg', () => {
        it('should return status 200 and success message', async () => {

            const res = await request(app)
                .delete(`/adm/students/${createdStudent.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Student erased successfully')
        })
        it('should return status 404 and success message', async () => {
            const res = await request(app)
                .delete('/adm/students/testReg')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Student not found!')
        })
    })
    describe('GET findAll /adm/students', () => {
        it('should return status 200 and a success message', async () => {
            const res = await request(app)
                .get('/adm/students')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.Students).toBeTruthy()
        })
        it('should return status 404 and error message', async () => {
            const deletedStd = await request(app)
                .delete(`/adm/students/${createdStudent.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
            if (deletedStd.status === "200") {
                const res = await request(app)
                    .get('/adm/students')
                    .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(404)
                expect(res.body.err).toBe('No students found!')
            }
        })
    })
})