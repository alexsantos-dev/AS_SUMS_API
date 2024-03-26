import { DataTypes } from 'sequelize'
import sequelize from '../../data/data.config.js'
import Student from './Student.model.js'
import Period from './Period.model.js'
import Discipline from './Discipline.model.js'
import Teacher from '../users/Teacher.model.js'

const Grade = sequelize.define('Grades', {
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 10
        }
    },
}, {
    freezeTableName: true
})

Grade.belongsTo(Student)
Grade.belongsTo(Period)
Grade.belongsTo(Discipline)
Grade.belongsTo(Teacher)

export default Grade
