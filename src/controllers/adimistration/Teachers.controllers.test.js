import sequelize from '../../data/Data.config.js'
import request from 'supertest'
import Teacher from '../../models/users/Teacher.model.js'
import app from '../../../index.js'

describe('TeachersControllers', () => {
    let createdTeacher
    let token
    beforeAll(async () => {
        await sequelize.sync()
        const teacherLoginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'adm-524018-24-DA',
                password: '7803-Aob'
            })

        token = teacherLoginResponse.body.token
    })
    const teacherData = {
        name: "teste a",
        sex: "m",
        phone: "12-131236478",
        email: "teste@gamail.com",
        password: "7803-Aob",
        discipline: "English"
    }
    beforeEach(async () => {
        createdTeacher = await request(app)
            .post('/adm/teachers')
            .send(teacherData)
            .set('Authorization', `Bearer ${token}`)
    })
    afterEach(async () => {
        await Teacher.destroy({ where: { email: 'teste@gamail.com' } })
    })
    afterAll(async () => {
        await sequelize.close()
    })

    describe('POST create /adm/teachers', () => {
        it('should return status 200 and sucess message', async () => {
            const res = createdTeacher
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Teacher added successfully!')
        })
        it('should return status 409 and a error message', async () => {
            const testTeacher = {}
            const res = await request(app)
                .post('/adm/teachers')
                .send(testTeacher)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Send all fields for add teacher!')
        })
    })
    describe('GET findAll /adm/teachers', () => {
        it('should return status 200 and a success message', async () => {
            const res = await request(app)
                .get('/adm/teachers')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.Teachers).toBeTruthy()
        })
        it('should return status 404 and error message', async () => {
            const deletedTchr = await request(app)
                .delete(`/adm/teachers/${createdTeacher.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
            if (deletedTchr.status === "200") {
                const res = await request(app)
                    .get('/adm/teachers')
                    .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(404)
                expect(res.body.err).toBe('No Teachers found!')
            }
        })
    })
    describe('GET findOneByReg /adm/teachers/reg/:reg', () => {
        it('should return status 200 and a Teacher', async () => {
            const res = await request(app)
                .get(`/adm/teachers/reg/${createdTeacher.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.Teacher).toBeTruthy()
        })
        it('should return status 404 and error message', async () => {
            const res = await request(app)
                .get('/adm/teachers/reg/testReg')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Teacher not found!')
        })
    })
    describe('GET findOneById /adm/teachers/id/:id', () => {
        it('should return status 200 and a Teacher', async () => {
            const res = await request(app)
                .get(`/adm/teachers/id/${createdTeacher.body.result.id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.Teacher).toBeTruthy()
        })
        it('should return status 404 and error message', async () => {
            const res = await request(app)
                .get('/adm/teachers/id/testID')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Teacher not found!')
        })
    })
    describe('PATCH update /adm/teachers/:reg', () => {
        it('should return status 200 and sucess message', async () => {
            const fields = {
                name: "FlingsBelta"
            }
            const res = await request(app)
                .patch(`/adm/teachers/${createdTeacher.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
                .send(fields)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Teacher updated successfully!')
        })
        it('should return status 409 and error message', async () => {
            const fields = {
                "": ""
            }
            const res = await request(app)
                .patch(`/adm/teachers/${createdTeacher.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
                .send(fields)
            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Update contains invalid fields!')
        })
        it('should return status 404 and error message', async () => {
            const fields = {
                name: "fulana"
            }
            const res = await request(app)
                .patch('/adm/teachers/testReg')
                .set('Authorization', `Bearer ${token}`)
                .send(fields)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Teacher not found!')
        })
    })
    describe('DELETE erase /adm/teachers/:reg', () => {
        it('should return status 200 and success message', async () => {
            const res = await request(app)
                .delete(`/adm/teachers/${createdTeacher.body.result.reg}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Teacher erased successfully')
        })
        it('should return status 404 and success message', async () => {
            const res = await request(app)
                .delete('/adm/teachers/testReg')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('Teacher not found!')
        })
    })
})