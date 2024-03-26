import { DataTypes } from 'sequelize'
import sequelize from '../../data/data.config.js'

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
            is: /^\d{2}-\d{9}\$/
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
            is: /^(?=.[a-zA-Z])(?=.\d)(?=.*[^\w\s])[A-Za-z\d^\w\s]{8,}$/
        }
    },
    class: {
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
        type: DataTypes.VIRTUAL,
        defaultValue: function () {
            const userType = this.getDataValue('typeUser')
            const currentDate = new Date()
            const month = String(currentDate.getMonth() + 1).padStart(2, '0')
            const year = String(currentDate.getFullYear())
            const initials = this.getDataValue('name').split(' ').map(part => part[0]).join('').toUpperCase()
            return `${userType}.${month}${year}.${initials}`
        },
        get() {
            return this.getDataValue('reg')
        }
    }

},
    {
        freezeTableName: true
    }
)

export default Student


