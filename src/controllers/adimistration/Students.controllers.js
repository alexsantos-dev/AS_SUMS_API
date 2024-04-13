import StudentsServices from '../../services/admistration/Students.services.js'
import bcrypt from 'bcrypt'

async function create(req, res) {
    try {
        const { id } = req.params
        const { name, sex, phone, email, password, classRoom } = req.body

        if (name && sex && phone && email && password && classRoom) {
            const result = await StudentsServices.create(name, sex, phone, email, password, classRoom)

            if (result) {
                res.status(200).json({ msg: 'Student added successfully!', result })
            }
        } else {
            res.status(409).json({ err: 'Send all fields for add student!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findAll(req, res) {
    try {
        const { id } = req.params
        const students = await StudentsServices.findAll()

        if (students.length > 0) {
            res.status(200).json({ Students: students })
        } else {
            res.status(404).json({ err: 'No students found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findOneByStudentReg(req, res) {
    try {
        const { id } = req.params
        const studentReg = req.query.studentReg
        const student = await StudentsServices.findOneByStudentReg(studentReg)

        if (student) {
            res.status(200).json({ Student: student })
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findOneByStudentId(req, res) {
    try {
        const { id } = req.params
        const studentId = req.query.studentId
        const student = await StudentsServices.findOneByStudentId(studentId)

        if (student) {
            res.status(200).json({ Student: student })
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
        if (!studentId) {
            return res.status(404).json({ err: 'id invalid!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const studentReg = req.query.studentReg
        const fields = req.body

        const student = await StudentsServices.findOneByStudentReg(studentReg)

        if (student) {
            const allowedFields = ['name', 'phone', 'email', 'classRoom', 'status']
            const isValidUpdate = Object.keys(fields).every(field => allowedFields.includes(field))

            if (!isValidUpdate || Object.keys(fields).length === 0) {
                return res.status(409).json({ err: 'Update contains invalid fields!' })
            }

            if (fields.password) {
                fields.password = await bcrypt.hash(fields.password, 10)
            }

            const result = await StudentsServices.update(studentReg, fields)

            if (result) {
                res.status(200).json({ msg: 'Student updated successfully!' })
            }
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function erase(req, res) {
    try {
        const { id } = req.params
        const studentReg = req.query.studentReg
        const student = await StudentsServices.findOneByStudentReg(studentReg)

        if (student) {
            const result = await StudentsServices.erase(studentReg)

            if (result) {
                res.status(200).json({ msg: 'Student erased successfully' })
            }
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

export default {
    create,
    findAll,
    findOneByStudentReg,
    findOneByStudentId,
    update,
    erase
}