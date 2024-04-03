import TeachersServices from './Teachers.services.js'
import sequelize from '../../data/Data.config.js'
import Teacher from '../../models/users/Teacher.model.js'

describe('TeachersServices', () => {
    let createdTeacher
    const teacherData = {
        "name": "teste a",
        "sex": "m",
        "phone": "12-131236478",
        "email": "teste@gamail.com",
        "password": "7803-Aob",
        "discipline": "English"
    }
    beforeAll(async () => {
        await sequelize.sync()
    })
    beforeEach(async () => {
        createdTeacher = await TeachersServices.create(teacherData.name, teacherData.sex, teacherData.phone, teacherData.email, teacherData.password, teacherData.discipline)
    })
    afterEach(async () => {
        await Teacher.destroy({ where: {}, truncate: true })
    })
    afterAll(async () => {
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

    describe('findOneByReg', () => {
        it('should return a teacher by REG', async () => {
            const res = await TeachersServices.findOneByReg(createdTeacher.reg)
            expect(res).toBeDefined()
        })
        it('should not return a teacher by REG', async () => {
            const res = await TeachersServices.findOneByReg('testReg')
            expect(res).toBeNull()
        })
    })
    describe('findOneById', () => {
        it('should return a teacher by ID', async () => {
            const res = await TeachersServices.findOneById(createdTeacher.id)
            expect(res).toBeDefined()
        })
        it('should not return a teacher by ID', async () => {
            const res = await TeachersServices.findOneById('testId')
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