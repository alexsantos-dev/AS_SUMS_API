import TeachersServices from './Teachers.services.js'
import sequelize from '../../data/data.config.js'
import Teacher from '../../models/users/Teacher.model.js'

describe('TeachersServices', () => {
    let createdTeacher
    const teacherData = {
        name: "teste a",
        sex: "m",
        phone: "12-131236478",
        email: "testea@gamail.com",
        password: "7803-Aob",
        discipline: "English"
    }
    beforeAll(async () => {
        await sequelize.sync()
        createdTeacher = await TeachersServices.create(teacherData.name, teacherData.sex, teacherData.phone, teacherData.email, teacherData.password, teacherData.discipline)
    })
    afterAll(async () => {
        await Teacher.destroy({ where: { email: 'testea@gamail.com' } })
        await sequelize.close()
    })

    describe('create', () => {
        it('Should create a teacher', async () => {
            expect(createdTeacher).toBeDefined()
        })
    })
    describe('findAll', () => {
        it('should return all teachers', async () => {
            const teachers = await TeachersServices.findAll()
            expect(teachers).toBeDefined()
            expect(teachers).not.toBe([])
        })
    })

    describe('findOneByTeacherReg', () => {
        it('should return a teacher by REG', async () => {
            const res = await TeachersServices.findOneByTeacherReg(createdTeacher.reg)
            expect(res).toBeDefined()
        })
        it('should not return a teacher by REG', async () => {
            const res = await TeachersServices.findOneByTeacherReg('testReg')
            expect(res).toBeNull()
        })
    })
    describe('findOneByTeacherId', () => {
        it('should return a teacher by ID', async () => {
            const res = await TeachersServices.findOneByTeacherId(createdTeacher.id)
            expect(res).toBeDefined()
        })
        it('should not return a teacher by ID', async () => {
            const res = await TeachersServices.findOneByTeacherId('testId')
            expect(res).toBeNull()
        })
    })
    describe('update', () => {
        const teacherUpdate = {
            "name": "teste e",
        }
        it('should to update teacher', async () => {
            const res = await TeachersServices.update(createdTeacher.reg, teacherUpdate.name)
            expect(res).toBeDefined()
        })
        it('should not to update teacher', async () => {
            const res = await TeachersServices.update()
            expect(Object.keys(res).length).toBeGreaterThan(0)
        })
    })
    describe('erase', () => {
        it('should erase teacher', async () => {
            const res = await TeachersServices.erase(createdTeacher.reg)
            expect(res).toBeDefined()
        })
        it('should not erase teacher', async () => {
            const res = await TeachersServices.erase('testReg')
            expect(res).toBeFalsy()
        })
    })

})