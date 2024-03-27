import StudentsServices from '../../services/admistration/Students.services.js'
import bcrypt from 'bcrypt'

async function create(req, res) {
    try {
        const { name, sex, phone, email, password, classRoom } = req.body

        if (name && sex && phone && email && password && classRoom) {
            const student = await StudentsServices.create(name, sex, phone, email, password, classRoom)

            if (student) {
                res.status(200).json({ message: 'Student added successfully!' })
            } else {
                res.status(400).json({ error: 'Error adding student!' })
            }
        } else {
            res.status(409).json({ error: 'Send all fields for add student!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findAll(req, res) {
    try {
        const students = await StudentsServices.findAll()

        if (students.length > 0) {
            res.status(200).json({ Students: students })
        } else {
            res.status(404).json({ error: 'No students found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findOneByReg(req, res) {
    try {
        const { reg } = req.params
        const student = await StudentsServices.findOneByReg(reg)

        if (student) {
            res.status(200).json(student)
        } else {
            res.status(404).json({ error: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findOneById(req, res) {
    try {
        const { id } = req.params
        const student = await StudentsServices.findOneById(id)

        if (student) {
            res.status(200).json(student)
        } else {
            res.status(404).json({ error: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function update(req, res) {
    try {
        const { reg } = req.params
        const fields = req.body

        const student = await StudentsServices.findOneByReg(reg)

        if (student) {
            if (fields.password) {
                fields.password = await bcrypt.hash(fields.password, 10)
            }
            if (Object.keys(fields).length > 0 && Object.values(fields).some(value => value !== "")) {
                const update = await StudentsServices.update(reg, fields)
                if (update) {
                    res.status(200).json({ message: 'Student updated successfully!' })
                } else {
                    res.status(400).json({ error: 'Error updating student!' })
                }
            } else {
                res.status(409).json({ error: 'Send some field for update student!' })
            }
        } else {
            res.status(404).json({ error: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function erase(req, res) {
    try {
        const { reg } = req.params
        const student = await StudentsServices.findOneByReg(reg)

        if (student) {
            const result = await StudentsServices.erase(reg)

            if (result) {
                res.status(200).json('Student erased successfully')
            } else {
                res.status(409).json('Error to erase student!')
            }

        } else {
            res.status(404).json({ error: 'Student not found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
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