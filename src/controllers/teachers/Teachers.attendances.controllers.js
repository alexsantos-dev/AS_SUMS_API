import TeachersAttendancesServices from '../../services/teachers/Teachers.attendances.services.js'

async function registAttendance(req, res) {
    try {
        const { id } = req.params
        const { studentId, disciplineId, periodId, value } = req.body

        if (studentId && disciplineId && periodId && value) {
            const result = await TeachersAttendancesServices.registAttendance(id, studentId, periodId, disciplineId, value)

            if (result) {
                res.status(200).json({ msg: 'Student attendance resgistred!', result })
            } else {
                res.status(409).json({ err: 'Attendance has been added for this student on the current date!' })
            }
        } else {
            res.status(406).json({ err: 'Send all fields to register attendance!' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {
    registAttendance
}