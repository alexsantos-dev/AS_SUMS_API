import Teacher from '../../models/users/Teacher.model.js'
import bcrypt from 'bcrypt'

async function create(name, sex, phone, email, password, discipline) {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const teacher = await Teacher.create({ name, sex, phone, email, password: hashPassword, discipline })
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

async function findAll() {
    try {
        const teachers = await Teacher.findAll({
            order: [['updatedAt', 'desc']]
        })

        return teachers
    }
    catch (error) {
        console.error(error)
    }
}

async function findOneByTeacherReg(teacherReg) {
    try {
        const teacher = await Teacher.findOne({
            where: {
                reg: teacherReg
            }
        })
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

async function findOneByTeacherId(teacherId) {
    try {
        const teacher = await Teacher.findOne({
            where: {
                id: teacherId
            }
        })
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

async function update(teacherReg, fields) {
    try {
        const teacher = await Teacher.update(fields, {
            where: {
                reg: teacherReg
            }
        })
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

async function erase(teacherReg) {
    try {
        const teacher = await Teacher.destroy({
            where: {
                reg: teacherReg
            }
        })
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

export default {
    create,
    findAll,
    findOneByTeacherId,
    findOneByTeacherReg,
    update,
    erase
}