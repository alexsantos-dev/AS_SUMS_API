import StudentsGradesServices from '../../services/students/Students.grades.services.js'

async function findGradesByStudentId(req, res) {
    try {
        const { studentId } = req.params
        const result = await StudentsGradesServices.findGradesByStudentId(studentId)

        if (Object.keys(result).length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ err: 'No grades found!' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {
    findGradesByStudentId
}