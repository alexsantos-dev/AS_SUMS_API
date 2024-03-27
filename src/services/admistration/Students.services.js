import Student from '../../models/users/Student.model.js'
import bcrypt from 'bcrypt'

async function create(name, sex, phone, email, password, classRoom) {
    try {
        await Student.sync()
        const hashPassword = await bcrypt.hash(password, 10)
        const student = await Student.create({ name, sex, phone, email, password: hashPassword, classRoom })
        return student
    }
    catch (error) {
        console.error(error)
    }
}

async function findAll() {
    try {
        await Student.sync()
        const students = await Student.findAll({
            order: [['updatedAt', 'desc']]
        })

        return students
    }
    catch (error) {
        console.error(error)
    }
}

async function findOneByReg(reg) {
    try {
        await Student.sync()
        const student = await Student.findOne({
            where: {
                reg: reg
            }
        })
        return student
    }
    catch (error) {
        console.error(error)
    }
}

export default {
    create,
    findAll,
    findOneByReg
}