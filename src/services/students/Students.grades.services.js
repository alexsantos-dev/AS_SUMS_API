import Grade from '../../models/grades/Grade.model.js'
import Student from '../../models/users/Student.model.js'
import Discipline from '../../models/grades/Discipline.model.js'
import Period from '../../models/grades/Period.model.js'
S
async function getNameFieldById(id) {
    try {
        const models = [Student, Discipline, Period]

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
        })

        for (let grade of result) {
            grade.DisciplineId = await getNameFieldById(grade.DisciplineId)
        }
        const groupedResult = result.reduce((acc, obj) => {
            const { PeriodId, DisciplineId, ...rest } = obj.dataValues
            acc[PeriodId] = acc[PeriodId] || {}
            acc[PeriodId][DisciplineId] = acc[PeriodId][DisciplineId] || []
            acc[PeriodId][DisciplineId].push(rest)
            return acc
        }, {})

        for (const periodId in groupedResult) {
            groupedResult[periodId] = Object.keys(groupedResult[periodId])
                .sort()
                .reduce((acc, discipline) => {
                    acc[discipline] = groupedResult[periodId][discipline]
                    return acc
                }, {})
        }
        return groupedResult
    }
    catch (error) {
        console.error({ error: error })
    }
}

export default {
    findGradesByStudentId
}