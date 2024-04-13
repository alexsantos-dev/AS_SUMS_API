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

async function calculateAverageGrades(groupedGrades) {
    try {
        const averageGrades = {}
        let totalAverage = 0
        let count = 0

        for (const periodId in groupedGrades) {
            for (const disciplineId in groupedGrades[periodId]) {
                const grades = groupedGrades[periodId][disciplineId].map(grade => grade.value)
                const average = grades.reduce((acc, val) => acc + val, 0) / grades.length

                if (!averageGrades[disciplineId]) {
                    averageGrades[disciplineId] = {
                        average: parseFloat(average.toFixed(2)),
                        status: ''
                    }
                } else {
                    averageGrades[disciplineId].average = (parseFloat(averageGrades[disciplineId].average) + average) / 2
                }

                totalAverage += average
                count++
            }
        }

        for (const disciplineId in averageGrades) {
            if (averageGrades[disciplineId].average < 5) {
                averageGrades[disciplineId].status = 'Reprovado'
            } else if (averageGrades[disciplineId].average < 7) {
                averageGrades[disciplineId].status = 'Recuperação'
            } else {
                averageGrades[disciplineId].status = 'Passed'
            }
        }

        const overallAverage = count > 0 ? totalAverage / count : 0
        averageGrades['OverallAverage'] = {
            value: parseFloat(overallAverage.toFixed(2)),
        }

        for (const disciplineId in averageGrades) {
            delete averageGrades[disciplineId].average
        }

        return averageGrades

    } catch (error) {
        console.error({ error: error })
    }
}

export default {
    findGradesByStudentId,
    calculateAverageGrades
}