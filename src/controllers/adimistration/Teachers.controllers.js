import TeachersServices from '../../services/admistration/Teachers.services.js'
import bcrypt from 'bcrypt'

async function create(req, res) {
    try {
        const { name, sex, phone, email, password, discipline } = req.body

        if (name && sex && phone && email && password && discipline) {
            const result = await TeachersServices.create(name, sex, phone, email, password, discipline)

            if (result) {
                res.status(200).json({ msg: 'Teacher added successfully!', result })
            }
        } else {
            res.status(409).json({ err: 'Send all fields for add teacher!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function findAll(req, res) {
    try {
        const teachers = await TeachersServices.findAll()

        if (teachers.length > 0) {
            res.status(200).json({ Teachers: teachers })
        } else {
            res.status(404).json({ err: 'No teachers found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function findOneByReg(req, res) {
    try {
        const { reg } = req.params
        const teacher = await TeachersServices.findOneByReg(reg)

        if (teacher) {
            res.status(200).json({ Teacher: teacher })
        } else {
            res.status(404).json({ err: 'Teacher not found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function findOneById(req, res) {
    try {
        const { id } = req.params
        const teacher = await TeachersServices.findOneById(id)

        if (teacher) {
            res.status(200).json({ Teacher: teacher })
        } else {
            res.status(404).json({ err: 'Teacher not found!' })
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

        const teacher = await TeachersServices.findOneByReg(reg)

        if (teacher) {
            const allowedFields = ['name', 'phone', 'email', 'classRoom', 'status']
            const isValidUpdate = Object.keys(fields).every(field => allowedFields.includes(field))

            if (!isValidUpdate || Object.keys(fields).length === 0) {
                return res.status(409).json({ err: 'Update contains invalid fields!' })
            }

            if (fields.password) {
                fields.password = await bcrypt.hash(fields.password, 10)
            }

            const result = await TeachersServices.update(reg, fields)

            if (result) {
                res.status(200).json({ msg: 'Teacher updated successfully!' })
            }
        } else {
            res.status(404).json({ err: 'Teacher not found!' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

async function erase(req, res) {
    try {
        const { reg } = req.params
        const teacher = await TeachersServices.findOneByReg(reg)

        if (teacher) {
            const result = await TeachersServices.erase(reg)

            if (result) {
                res.status(200).json({ msg: 'Teacher erased successfully' })
            }
        } else {
            res.status(404).json({ err: 'Teacher not found!' })
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