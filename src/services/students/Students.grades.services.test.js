import StudentsGradesServices from './Students.grades.services.js'
import TeachersGradesServices from '../teachers/Teachers.grades.services.js'
import Grade from '../../models/grades/Grade.model.js'
import sequelize from '../../data/Data.config.js'

describe('StudentsGradesServices', () => {
    let createdGrade
    const gradeData = {
        teacherId: '9b12c5df-a276-4bfc-b50e-178aa550abf7',
        studentId: '14f3ce21-62c0-430a-a6e2-c77127b018b6',
        disciplineId: '17029a7a-f388-4acd-a1ca-e44aad5f6238',
        periodId: 1,
        value: 8.5
    }
    beforeAll(async () => {
        await sequelize.sync()
    })
    beforeEach(async () => {
        if (!createdGrade) {
            createdGrade = await TeachersGradesServices.addGrade(gradeData.teacherId, gradeData.studentId, gradeData.disciplineId, gradeData.periodId, gradeData.value)
        }
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