import Student from '../../models/users/Student.model.js'
import bcrypt from 'bcrypt'

async function create(name, sex, phone, email, password, classRoom) {
    try {
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
        const students = await Student.findAll({
            order: [['updatedAt', 'desc']]
        })

        return students
    }
    catch (error) {
        console.error(error)
    }
}

async function findOneByStudentReg(studentReg) {
    try {
        const student = await Student.findOne({
            where: {
                reg: studentReg
            }
        })
        return student
    }
    catch (error) {
        console.error(error)
    }
}

async function findOneByStudentId(studentId) {
    try {
        const student = await Student.findOne({
            where: {
                id: studentId
            }
        })
        return student
    }
    catch (error) {
        console.error(error)
    }
}

async function update(studentReg, fields) {
    try {
        const student = await Student.update(fields, {
            where: {
                reg: studentReg
            }
        })
        return student
    }
    catch (error) {
        console.error(error)
    }
}

async function erase(studentReg) {
    try {
        const student = await Student.destroy({
            where: {
                reg: studentReg
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
    findOneByStudentId,
    findOneByStudentReg,
    update,
    erase
}