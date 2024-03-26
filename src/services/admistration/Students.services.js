import Student from '../../models/users/Student.model.js'
import bcrypt from 'bcrypt'

async function addStudent(name, sex, phone, email, password, classRoom) {
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

async function searchStudents() {
    await Student.sync()
    const students = await Student.findAll({
        order: [['updatedAt', 'desc']]
    })

    return students
}

export default {
    addStudent,
    searchStudents
}