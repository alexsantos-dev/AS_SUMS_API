import { DataTypes } from 'sequelize'
import sequelize from '../../data/Data.config.js'

const Student = sequelize.define('Students', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 50],
            is: /^[\u00C0-\u017Fa-zA-Z\s]*$/
        }
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['m', 'f']],
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d{2}-?\d{9}$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        /*         validate: {
                    is: /^(?=.[a-zA-Z])(?=.\d)(?=.*[^\w\s])[A-Za-z\d^\w\s]{8,}$/
                } */
    },
    classRoom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['301', '302', '303', '304']]
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['active', 'inative']]
            }
        },
        defaultValue: 'active'
    },
    typeUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'std'
    },
    reg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    freezeTableName: true
}
)

Student.beforeValidate((student, options) => {
    const userType = student.typeUser
    const currentDate = new Date()
    const seconds = String(currentDate.getSeconds()).padStart(2, '0')
    const minutes = String(currentDate.getMinutes()).padStart(2, '0')
    const hour = String(currentDate.getHours()).padStart(2, '0')
    const year = String(currentDate.getFullYear()).slice(-2)
    const initials = student.name.split(' ').map(part => part[0]).join('').toUpperCase()
    student.reg = `${userType}-${seconds}${minutes}${hour}-${year}-${initials}`
})

export default Student


