import Discipline from '../../models/grades/Discipline.model.js'
import Grade from "../../models/grades/Grade.model.js"
import Period from '../../models/grades/Period.model.js'
import Student from '../../models/users/Student.model.js'
import Teacher from '../../models/users/Teacher.model.js'

async function addGrade(teacherId, studentId, disciplineId, periodId, value) {
    try {
        await Grade.sync()
        const grade = Grade.create({
            TeacherId: teacherId,
            StudentId: studentId,
            DisciplineId: disciplineId,
            PeriodId: periodId,
            value: value
        })
        return grade
    }
    catch (error) {
        console.error(error)
    }
}

async function editGrade(id, fields) {
    try {
        const edit = await Grade.update(fields, {
            where: {
                id: id
            }
        })
        return edit
    } catch (error) {
        console.error({ error: error })
    }
}

async function findGradeById(id) {
    try {
        const grade = Grade.findByPk(id)
        return grade
    } catch (error) {
        console.error({ error: error })
    }
}

async function getNameFieldById(id) {
    const models = [Student, Discipline, Period, Teacher]

    for (const model of models) {
        const result = await model.findByPk(id, {
            atributes: ['name']
        })
        if (result) {
            return result.name
        }
    }
}

export default {
    addGrade,
    editGrade,
    findGradeById,
    getNameFieldById
}