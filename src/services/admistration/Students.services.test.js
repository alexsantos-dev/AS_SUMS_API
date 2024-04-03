import Student from '../../models/users/Student.model.js'
import StudentsServices from './Students.services.js'
import sequelize from '../../data/Data.config.js'

describe('StudentsServices', () => {
    beforeAll(async () => {
        await sequelize.sync()
    })
    afterAll(async () => {
        await Student.destroy({ where: {}, truncate: true })
        await sequelize.close()
    })

    describe('create', () => {
        it('Should create a student', async () => {
            const studentData = {
                "name": "teste a",
                "sex": "m",
                "phone": "12-131236478",
                "email": "teste@gamail.com",
                "password": "7803-Aob",
                "classRoom": "301"
            }
            const createdStudent = await StudentsServices.create(studentData.name, studentData.sex, studentData.phone, studentData.email, studentData.password, studentData.classRoom)
            expect(createdStudent).toBeTruthy()
        })
    })
    describe('findAll', () => {
        it('should return all students', async () => {
            const students = await StudentsServices.findAll()
            expect(students).toBeTruthy()
            expect(students).not.toBe([])
        })
    })
    describe('findOneByReg', () => {
        it('should return a student by REG', async () => {
            const studentData = {
                "name": "teste b",
                "sex": "m",
                "phone": "13-931434468",
                "email": "teste2@gamail.com",
                "password": "7803-Aob",
                "classRoom": "302"
            }
            const student = await StudentsServices.create(studentData.name, studentData.sex, studentData.phone, studentData.email, studentData.password, studentData.classRoom)
            const res = await StudentsServices.findOneByReg(student.reg)
            expect(res).toBeTruthy()
        })
    })
    describe('findOneById', () => {
        it('should return a student by ID', async () => {
            const studentData = {
                "name": "teste c",
                "sex": "m",
                "phone": "18-935634568",
                "email": "teste3@gamail.com",
                "password": "7803-Aob",
                "classRoom": "304"
            }
            const student = await StudentsServices.create(studentData.name, studentData.sex, studentData.phone, studentData.email, studentData.password, studentData.classRoom)
            const res = await StudentsServices.findOneById(student.id)
            expect(res).toBeTruthy()
        })
    })
    describe('update', () => {
        const studentData = {
            "name": "teste d",
            "sex": "m",
            "phone": "18-925634568",
            "email": "teste4@gamail.com",
            "password": "7803-Aob",
            "classRoom": "304"
        }
        const studentUpdate = {
            "name": "teste e",
        }
        it('should to update student', async () => {
            const student = await StudentsServices.create(studentData.name, studentData.sex, studentData.phone, studentData.email, studentData.password, studentData.classRoom)
            const res = await StudentsServices.update(student.reg, studentUpdate.name)
            expect(res).toBeTruthy()
        })
    })
    describe('erase', () => {
        it('should erase student', async () => {
            const studentData = {
                "name": "teste f",
                "sex": "m",
                "phone": "18-725634568",
                "email": "teste5@gamail.com",
                "password": "7803-Aob",
                "classRoom": "304"
            }
            const student = await StudentsServices.create(studentData.name, studentData.sex, studentData.phone, studentData.email, studentData.password, studentData.classRoom)
            const res = await StudentsServices.erase(student.reg)
            expect(res).toBeTruthy()
        })
    })
})