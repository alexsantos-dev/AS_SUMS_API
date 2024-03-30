import TeacherGradesServices from '../../services/teachers/Teachers.grades.services.js'

async function addGrade(req, res) {
    try {
        const { teacherId, studentId, disciplineId, periodId, value } = req.body

        if (teacherId && studentId && disciplineId && periodId && value) {
            const checkValidate = await TeacherGradesServices.checkGradeByPeriodStudentId(periodId, studentId)
            if (!checkValidate) {
                const result = await TeacherGradesServices.addGrade(teacherId, studentId, disciplineId, periodId, value)

                if (result) {
                    res.status(200).json('Grade added successfully!')
                } else {
                    res.status(400).json('Error adding grade!')
                }
            } else {
                res.status(400).json('Period was added for this student!')
            }
        } else {
            res.status(409).json('Send all fields to add grade!')
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

async function editGrade(req, res) {
    try {
        const { id } = req.params
        const fields = req.body
        const checkId = await TeacherGradesServices.findGradeById(id)

        if (checkId) {
            const allowedFields = ['teacherId', 'studentId', 'disciplineId', 'periodId', 'value']
            const isValidUpdate = Object.keys(fields).every(field => allowedFields.includes(field))

            if (!isValidUpdate || Object.keys(fields) === 0) {
                res.status(400).json({ error: 'Update contains invalid fields!' })
            }

            const result = await TeacherGradesServices.editGrade(id, fields)
            if (result) {
                res.status(200).json({ message: 'Grade updated successfully!' })
            } else {
                res.status(400).json({ error: 'Error updating grade!' })
            }
        } else {
            res.status(404).json({ error: 'Grade not found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error })
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

            res.status(200).json({ Grade: result })
        } else {
            res.status(404).json({ error: 'Grade not found!' })
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
}



export default {
    addGrade,
    editGrade,
    findGradeById,
}