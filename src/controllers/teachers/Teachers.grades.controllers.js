import TeacherGradesServices from '../../services/teachers/Teachers.grades.services.js'

async function addGrade(req, res) {
    try {
        const { teacherId, studentId, disciplineId, periodId, value } = req.body

        if (teacherId && studentId && disciplineId && periodId && value) {
            const checkValidate = await TeacherGradesServices.checkGradeValidate(studentId, periodId, disciplineId)
            if (!checkValidate) {
                const result = await TeacherGradesServices.addGrade(teacherId, studentId, disciplineId, periodId, value)
                res.status(200).json({ msg: 'Grade added successfully!', gradeId: result.id })

            } else {
                res.status(409).json({ err: 'Period was added for this student!' })
            }
        } else {
            res.status(406).json({ err: 'Send all fields to add grade!' })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

async function editGrade(req, res) {
    try {
        const { id } = req.params
        const fields = req.body
        const checkId = await TeacherGradesServices.findGradeById(id)

        if (checkId) {
            const allowedFields = ['TeacherId', 'StudentId', 'DisciplineId', 'PeriodId', 'value']
            const isValidUpdate = Object.keys(fields).every(field => allowedFields.includes(field))
            const result = await TeacherGradesServices.editGrade(id, fields)

            if (isValidUpdate && result) {
                res.status(200).json({ msg: 'Grade updated successfully' })
            } else {
                res.status(400).json({ err: 'Update contains invalid fields!' })
            }
        } else {
            res.status(404).json({ err: 'Grade not found!' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

async function findGradeById(req, res) {
    try {
        const { id } = req.params
        const result = await TeacherGradesServices.findGradeById(id)

        if (result) {
            const fields = [result.StudentId, result.DisciplineId, result.PeriodId, result.TeacherId]
            const names = []

            for (const field of fields) {
                const name = await TeacherGradesServices.getNameFieldById(field)
                names.push(name)
            }

            result.StudentId = names[0]
            result.DisciplineId = names[1]
            result.PeriodId = names[2]
            result.TeacherId = names[3]

            res.status(200).json(result)
        } else {
            res.status(404).json({ err: 'Grade not found!' })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}



export default {
    addGrade,
    editGrade,
    findGradeById,
}