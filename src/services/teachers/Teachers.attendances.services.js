import Attendance from '../../models/attendance/Attendance.model.js'
import Student from '../../models/users/Student.model.js'
import Teacher from '../../models/users/Teacher.model.js'
import Discipline from '../../models/grades/Discipline.model.js'
import Period from '../../models/grades/Period.model.js'
import { getCurrentDate } from '../users/CurrentDate.service.js'

async function registAttendance(id, studentId, periodId, disciplineId, value) {
    try {
        const student = await Student.findByPk(studentId)
        const classRoom = student.classRoom
        const currentDate = getCurrentDate()

        const checkAttendance = await Attendance.findAll({
            where: {
                TeacherId: id,
                StudentId: studentId,
                DisciplineId: disciplineId,
                PeriodId: periodId,
                classRoom: classRoom,
                date: currentDate
            },
        })

        if (checkAttendance.length === 0) {
            const attendance = Attendance.create({
                TeacherId: id,
                StudentId: studentId,
                DisciplineId: disciplineId,
                PeriodId: periodId,
                classRoom: classRoom,
                value: value
            })
            return attendance
        }
    } catch (error) {
        console.log({ error: error })
    }
}

async function getNameFieldById(id) {
    try {
        const models = [Student, Discipline, Teacher, Period]

        for (const model of models) {
            const result = await model.findByPk(id, {
                atributes: ['name']
            })
            if (result) {
                return result.name
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export default {
    registAttendance,
    getNameFieldById,
}