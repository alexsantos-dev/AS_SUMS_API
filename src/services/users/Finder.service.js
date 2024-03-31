import Administrator from '../../models/users/Administrator.model.js'
import Teacher from '../../models/users/Teacher.model.js'
import Student from '../../models/users/Student.model.js'

export async function globalFindOneByReg(reg) {
    try {
        const allModels = [Administrator, Teacher, Student]

        for (const model of allModels) {
            const result = await model.findOne({
                where: {
                    reg: reg
                }
            })
            if (result) {
                return result
            }
        }
    }
    catch (error) {
        console.error(error)
    }
}



