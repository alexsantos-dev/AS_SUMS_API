import { globalFindOneByReg } from './Finder.service.js'
import Student from '../../models/users/Student.model.js'
import sequelize from '../../data/Data.config.js'

describe('globalFindOneByReg', () => {
    let createdStudent
    const studentData = {
        name: "Alek Das Computarias",
        sex: "m",
        phone: "98-931334568",
        email: "alkpc@gamail.com",
        password: "7803-Aob",
        classRoom: "304"
    }
    beforeAll(async () => {
        await sequelize.sync()
        createdStudent = await Student.create(studentData)
    })
    afterAll(async () => {
        await Student.destroy({ where: { email: 'alkpc@gamail.com' } })
        await sequelize.close()
    })
    it('Should return the user if found in any model', async () => {
        const res = await globalFindOneByReg(createdStudent.reg)
        expect(res.name).toBe('Alek Das Computarias')
    })

    it('Should return undefined if registration code is not found', async () => {
        const res = await globalFindOneByReg('test-123456-89-dtf')
        expect(res).toBeUndefined()
    })
})