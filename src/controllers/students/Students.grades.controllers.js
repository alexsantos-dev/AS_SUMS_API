import StudentsGradesServices from '../../services/students/Students.grades.services.js'

async function findGradesByStudentId(req, res) {
    try {
        const { id } = req.params
        const result = await StudentsGradesServices.findGradesByStudentId(id)
        if (Object.keys(result).length > 0) {
            const groupedGrades = await StudentsGradesServices.calculateAverageGrades(result)
            res.status(200).json({ Grades: result, Averages: groupedGrades })
        } else {
            res.status(404).json({ err: 'No grades found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export default {
    findGradesByStudentId
}