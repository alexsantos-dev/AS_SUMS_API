import TeachersAttendancesServices from './Teachers.attendances.services.js'
import sequelize from '../../data/data.config.js'
import Attendance from '../../models/attendance/Attendance.model.js'

describe('TeachersAttendancesServices', () => {
    let regist
    let id
    const attendanceData = {
        id: "091e1f3c-898b-4900-ab91-853f69d99b28",
        studentId: "40d972e7-1dbe-4204-8e4d-da34f6dff278",
        periodId: "1",
        disciplineId: "4e14bbd1-0c60-4b8c-8f13-72968c03ba0e",
        value: "present"
    }

    beforeAll(async () => {
        await sequelize.sync()
        regist = await TeachersAttendancesServices.registAttendance(attendanceData.id, attendanceData.studentId, attendanceData.periodId, attendanceData.disciplineId, attendanceData.value)

        id = regist.id
    })
    afterAll(async () => {
        await Attendance.destroy({ where: { id: id } })
        await sequelize.close()
    })

    describe('registAttendance', () => {
        it('should regist a attendance', () => {
            expect(regist).toBeDefined()
        })
        it('should not regist a attendance', async () => {
            const res = await TeachersAttendancesServices.registAttendance('invalid_teacher_id', 'invalid_student_id', 'invalid_discipline_id', 'invalid_period_id', 'invalid_value')
            expect(res).toBeUndefined()
        })
    })
})