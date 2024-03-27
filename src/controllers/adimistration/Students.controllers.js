import StudentsServices from '../../services/admistration/Students.services.js'

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
            res.status(409).json({ error: 'Send all fields to add student!' })
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

async function erase(req, res) {
    try {
        const { reg } = req.params
        const student = await StudentsServices.findOneByReg(reg)

        if (student) {
            const result = await StudentsServices.erase()

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
    erase
}