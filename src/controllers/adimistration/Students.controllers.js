import StudentsServices from '../../services/admistration/Students.services.js'
import bcrypt from 'bcrypt'

async function create(req, res) {
    try {
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
        res.status(500).json(error)
    }
}

async function findAll(req, res) {
    try {
        const students = await StudentsServices.findAll()

        if (students.length > 0) {
            res.status(200).json({ Students: students })
        } else {
            res.status(404).json({ err: 'No students found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function findOneByReg(req, res) {
    try {
        const { reg } = req.params
        const student = await StudentsServices.findOneByReg(reg)

        if (student) {
            res.status(200).json({ Student: student })
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function findOneById(req, res) {
    try {
        const { id } = req.params
        const student = await StudentsServices.findOneById(id)

        if (student) {
            res.status(200).json({ Student: student })
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function update(req, res) {
    try {
        const { reg } = req.params
        const fields = req.body

        const student = await StudentsServices.findOneByReg(reg)

        if (student) {
            const allowedFields = ['name', 'phone', 'email', 'classRoom', 'status']
            const isValidUpdate = Object.keys(fields).every(field => allowedFields.includes(field))

            if (!isValidUpdate || Object.keys(fields).length === 0) {
                return res.status(409).json({ err: 'Update contains invalid fields!' })
            }

            if (fields.password) {
                fields.password = await bcrypt.hash(fields.password, 10)
            }

            const result = await StudentsServices.update(reg, fields)

            if (result) {
                res.status(200).json({ msg: 'Student updated successfully!' })
            }
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function erase(req, res) {
    try {
        const { reg } = req.params
        const student = await StudentsServices.findOneByReg(reg)

        if (student) {
            const result = await StudentsServices.erase(reg)

            if (result) {
                res.status(200).json({ msg: 'Student erased successfully' })
            }
        } else {
            res.status(404).json({ err: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

export default {
    create,
    findAll,
    findOneByReg,
    findOneById,
    update,
    erase
}