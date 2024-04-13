import Student from '../../models/users/Student.model.js'
import StudentsServices from './Students.services.js'
import sequelize from '../../data/data.config.js'

describe('StudentsServices', () => {
    let createdStudent
    const studentData = {
        name: "teste a",
        sex: "m",
        phone: "12-131236478",
        email: "testea@gamail.com",
        password: "7803-Aob",
        classRoom: "301"
    }
    beforeAll(async () => {
        await sequelize.sync()
        createdStudent = await StudentsServices.create(studentData.name, studentData.sex, studentData.phone, studentData.email, studentData.password, studentData.classRoom)
    })
    afterAll(async () => {
        await Student.destroy({ where: { email: 'testea@gamail.com' } })
        await sequelize.close()
    })

    describe('create', () => {
        it('Should create a student', async () => {
            expect(createdStudent).toBeDefined()
        })
    })
    describe('findAll', () => {
        it('should return all students', async () => {
            const students = await StudentsServices.findAll()
            expect(students).toBeDefined()
            expect(students).not.toBe([])
        })
    })

    describe('findOneByStudentReg', () => {
        it('should return a student by REG', async () => {
            const res = await StudentsServices.findOneByStudentReg(createdStudent.reg)
            expect(res).toBeDefined()
        })
        it('should not return a student by REG', async () => {
            const res = await StudentsServices.findOneByStudentReg('testReg')
            expect(res).toBeNull()
        })
    })
    describe('findOneByStudentId', () => {
        it('should return a student by ID', async () => {
            const res = await StudentsServices.findOneByStudentId(createdStudent.id)
            expect(res).toBeDefined()
        })
        it('should not return a student by ID', async () => {
            const res = await StudentsServices.findOneByStudentId('testId')
            expect(res).toBeNull()
        })
    })
    describe('update', () => {
        const studentUpdate = {
            "name": "teste e",
        }
        it('should to update student', async () => {
            const res = await StudentsServices.update(createdStudent.reg, studentUpdate.name)
            expect(res).toBeDefined()
        })
        it('should not to update student', async () => {
            const res = await StudentsServices.update()
            expect(Object.keys(res).length).toBeGreaterThan(0)
        })
    })
    describe('erase', () => {
        it('should erase student', async () => {
            const res = await StudentsServices.erase(createdStudent.reg)
            expect(res).toBeDefined()
        })
        it('should not erase student', async () => {
            const res = await StudentsServices.erase('testReg')
            expect(res).toBeFalsy()
        })
    })

})

