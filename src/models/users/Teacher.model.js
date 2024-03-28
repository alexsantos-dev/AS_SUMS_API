import { DataTypes } from 'sequelize'
import sequelize from '../../data/Data.config.js'

const Teacher = sequelize.define('Teachers', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        validate: {
            isUUID: {
                args: 4
            }
        }
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
        },
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
        validate: {
            len: [8, 100]
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
    discipline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Matemathics', 'Science', 'Arts', 'English', 'Sociology']]
        },
    },
    typeUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'tchr',
        validate: {
            is: 'tchr'
        },
    },
    reg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
},
    {
        freezeTableName: true
    }
)

Teacher.beforeValidate((teacher, options) => {

    if (teacher && teacher.name) {
        const userType = teacher.typeUser
        const currentDate = new Date()
        const seconds = String(currentDate.getSeconds()).padStart(2, '0')
        const minutes = String(currentDate.getMinutes()).padStart(2, '0')
        const hour = String(currentDate.getHours()).padStart(2, '0')
        const year = String(currentDate.getFullYear()).slice(-2)
        const initials = teacher.name.split(' ').map(part => part[0]).join('').toUpperCase()
        teacher.reg = `${userType}-${seconds}${minutes}${hour}-${year}-${initials}`
    }
})

export default Teacher
