import request from 'supertest'
import app from '../../../app.js'
import Attendance from '../../models/attendance/Attendance.model.js'
import sequelize from '../../data/data.config.js'

describe('TeachersAttendancesControllers', () => {
    let regist
    let attendanceId
    let token
    const attendanceData = {
        id: "091e1f3c-898b-4900-ab91-853f69d99b28",
        studentId: "40d972e7-1dbe-4204-8e4d-da34f6dff278",
        periodId: "1",
        disciplineId: "4e14bbd1-0c60-4b8c-8f13-72968c03ba0e",
        value: "present"
    }
    const tchrId = attendanceData.id
    beforeAll(async () => {
        sequelize.sync()
        const loginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'tchr-231818-24-CS',
                password: 'tcher123'
            })
        token = loginResponse.body.token

        regist = await request(app)
            .post(`/tchr/attendance/${tchrId}`)
            .send(attendanceData)
            .set('Authorization', `Bearer ${token}`)

        attendanceId = regist.body.result.id
    })
    afterAll(async () => {
        await Attendance.destroy({ where: { id: attendanceId } })
        await sequelize.close()
    })

    describe('registAttendance', () => {
        it('should return status 200 and regist a attendance', async () => {
            const res = regist
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Student attendance resgistred!')
        })
        it('should return status 409 and error message', async () => {
            const res = await request(app)
                .post(`/tchr/attendance/${tchrId}`)
                .send(attendanceData)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Attendance has been added for this student on the current date!')
        })
        it('should return status 406 and error message', async () => {
            const res = await request(app)
                .post(`/tchr/attendance/${tchrId}`)
                .send({})
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(406)
            expect(res.body.err).toBe('Send all fields to register attendance!')
        })
    })
})