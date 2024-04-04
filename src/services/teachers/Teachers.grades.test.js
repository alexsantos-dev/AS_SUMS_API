import TeachersGradesServices from './Teachers.grades.services.js'
import sequelize from '../../data/Data.config.js'
import Grade from '../../models/grades/Grade.model.js'

describe('TeachersGradesServices', () => {
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

    describe('addGrade', () => {
        it('should to add a grade', async () => {
            expect(createdGrade).toBeDefined()
        })
    })
    describe('findGradeById', () => {
        it('should return a grade', async () => {
            const res = await TeachersGradesServices.findGradeById(createdGrade.id)
            expect(res).toBeDefined()
        })
        it('should not return a grade', async () => {
            const res = await TeachersGradesServices.findGradeById('testId')
            expect(res).toBeNull()
        })
    })
    describe('editGrade', () => {
        it('should update a grade', async () => {
            const res = await TeachersGradesServices.editGrade(createdGrade.id, { value: 9.0 })
            expect(res).toBeDefined()
        })
        it('should not update a grade', async () => {
            const res = await TeachersGradesServices.editGrade('testId', { value: 9.0 })
            expect(Object.keys(res).length).toBeGreaterThan(0)
        })
    })
    describe('checkGradeByPeriodStudentId', () => {
        it('should check a grade', async () => {
            const res = await TeachersGradesServices.checkGradeByPeriodStudentId(createdGrade.PeriodId, createdGrade.StudentId)
            expect(res).toBeDefined()
        })
        it('should not check a grade', async () => {
            const res = await TeachersGradesServices.checkGradeByPeriodStudentId('periodTestId', 'studentTestId')
            expect(res).toBeNull()
        })
    })
    describe('getNameFieldById', () => {
        it('should get name of field', async () => {
            const res = await TeachersGradesServices.getNameFieldById(createdGrade.StudentId, createdGrade.DisciplineId, createdGrade.PeriodId, createdGrade.TeacherId)
            expect(res).toBeDefined()
        })
        it('should not get name of field', async () => {
            const res = await TeachersGradesServices.getNameFieldById('studentTestId', 'disciplineTestId', 'periodTestId', 'teacherTestId')
            expect(res).toBeUndefined()
        })
    })
})