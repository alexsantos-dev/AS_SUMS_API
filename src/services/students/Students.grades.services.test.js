import StudentsGradesServices from './Students.grades.services.js'
import TeachersGradesServices from '../teachers/Teachers.grades.services.js'
import Grade from '../../models/grades/Grade.model.js'
import sequelize from '../../data/Data.config.js'

describe('StudentsGradesServices', () => {
    let createdGrade
    const gradeData = {
        teacherId: '091e1f3c-898b-4900-ab91-853f69d99b28',
        studentId: '374fbf39-1c31-4727-8128-644e67c3cfb0',
        disciplineId: '17029a7a-f388-4acd-a1ca-e44aad5f6238',
        periodId: 1,
        value: 8.5
    }
    beforeAll(async () => {
        await sequelize.sync()
        createdGrade = await TeachersGradesServices.addGrade(gradeData.teacherId, gradeData.studentId, gradeData.disciplineId, gradeData.periodId, gradeData.value)
    })
    afterAll(async () => {
        await Grade.destroy({ where: { id: createdGrade.id } })
        await sequelize.close()
    })

    describe('findGradesByStudentId', () => {
        it('should return grades of student', async () => {
            const res = await StudentsGradesServices.findGradesByStudentId(createdGrade.StudentId)
            expect(res).toBeDefined()
        })
        it('should not return grades of student', async () => {
            const res = await StudentsGradesServices.findGradesByStudentId('testeId')
            expect(res.length).toBe(0)
        })
    })
})