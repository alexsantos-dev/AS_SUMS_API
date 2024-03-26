import Student from '../../models/users/Student.model.js'
import bcrypt from 'bcrypt'

async function addStudent(name, sex, phone, email, password, classRoom) {
    await Student.sync()
    const hashPassword = await bcrypt.hash(password, 10)
    const student = await Student.create({ name, sex, phone, email, hashPassword, classRoom })
    return student
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