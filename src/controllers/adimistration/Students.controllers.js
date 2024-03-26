import StudentsServices from '../../services/admistration/Students.services.js'

async function addStudent(req, res) {
    try {
        const { name, sex, phone, email, password, classRoom } = req.body

        if (name && sex && phone && email && password && classRoom) {
            const student = await StudentsServices.addStudent(name, sex, phone, email, password, classRoom)

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

async function searchStudents(req, res) {
    try {
        const students = await StudentsServices.searchStudents()

        if (students.length > 0) {
            res.status(200).json({ Students: students })
        } else {
            res.status(404).json({ error: 'no students found!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

export default {
    addStudent,
    searchStudents
}