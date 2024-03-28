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

async function findOneByReg(reg) {
    try {
        const teacher = await Teacher.findOne({
            where: {
                reg: reg
            }
        })
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

async function findOneById(id) {
    try {
        const teacher = await Teacher.findByPk(id)
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

async function update(reg, fields) {
    try {
        const teacher = await Teacher.update(fields, {
            where: {
                reg: reg
            }
        })
        return teacher
    }
    catch (error) {
        console.error(error)
    }
}

async function erase(reg) {
    try {
        const teacher = await Teacher.destroy({
            where: {
                reg: reg
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
    findOneById,
    findOneByReg,
    update,
    erase
}