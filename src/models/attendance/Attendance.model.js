import sequelize from '../../data/data.config.js'
import { DataTypes } from 'sequelize'
import Student from '../users/Student.model.js'
import Teacher from '../users/Teacher.model.js'
import Discipline from '../grades/Discipline.model.js'
import Period from '../grades/Period.model.js'
import { getCurrentDate } from '../../services/users/CurrentDate.service.js'

const Attendance = sequelize.define('Attendances', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    classRoom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['301', '302', '303', '304']]
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: getCurrentDate(),
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['present', 'absent']]
        },
        defaultValue: 'absent'
    }
}, {
    freezeTableName: true
})

Attendance.belongsTo(Student)
Attendance.belongsTo(Teacher)
Attendance.belongsTo(Discipline)
Attendance.belongsTo(Period)

export default Attendance