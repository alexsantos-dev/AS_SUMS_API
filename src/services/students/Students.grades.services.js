import Grade from '../../models/grades/Grade.model.js'

import Student from '../../models/users/Student.model.js'
import Discipline from '../../models/grades/Discipline.model.js'
import Period from '../../models/grades/Period.model.js'
import Teacher from '../../models/users/Teacher.model.js'

async function getNameFieldById(id) {
    try {
        const models = [Student, Discipline, Period, Teacher]

        for (const model of models) {
            const result = await model.findByPk(id, {
                atributes: ['name']
            })
            if (result) {
                return result.name
            }
        }
    } catch (error) {
        console.error({ error: error })
    }
}

async function findGradesByStudentId(studentId) {
    try {
        let result = await Grade.findAll({
            where: {
                StudentId: studentId
            },
            attributes: ['DisciplineId', 'value', 'PeriodId'],
            order: [
                ['PeriodId', 'ASC']
            ]
        })

        for (let grade of result) {
            grade.DisciplineId = await getNameFieldById(grade.DisciplineId)
        }
        return result
    }
    catch (error) {
        console.error({ error: error })
    }
}

export default {
    findGradesByStudentId
}