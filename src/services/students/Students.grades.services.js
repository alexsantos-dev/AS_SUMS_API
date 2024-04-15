import Grade from '../../models/grades/Grade.model.js'
import Student from '../../models/users/Student.model.js'
import Discipline from '../../models/grades/Discipline.model.js'
import Period from '../../models/grades/Period.model.js'

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
            acc[PeriodId][DisciplineId] = acc[PeriodId][DisciplineId] || {}
            acc[PeriodId][DisciplineId] = rest
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

function calculateAverageGrades(grades) {
    try {
        const averages = {}
        const overallGrades = {}
        let count = 0

        for (const period in grades) {
            count++
            const periodGrades = grades[period]

            for (const discipline in periodGrades) {
                const gradeValue = periodGrades[discipline].value
                if (averages[discipline]) {
                    averages[discipline].value += gradeValue
                    overallGrades[discipline] += gradeValue
                } else {
                    averages[discipline] = { value: gradeValue, status: '' }
                    overallGrades[discipline] = gradeValue
                }
            }
        }

        for (const discipline in averages) {
            averages[discipline].value = parseFloat((averages[discipline].value / count).toFixed(2))
            averages[discipline].status = averages[discipline].value >= 7 ? 'Passed' : (averages[discipline].value >= 5 ? 'Recovery' : 'Disapproved')
        }

        const overallAverage = Object.values(overallGrades).reduce((acc, val) => acc + val, 0) / (count * Object.keys(overallGrades).length)

        return {
            disciplineAverages: averages,
            overallAverage: parseFloat(overallAverage.toFixed(2)),
        }

    } catch (error) {
        console.error({ error: error })
        return null
    }
}



export default {
    findGradesByStudentId,
    calculateAverageGrades
}