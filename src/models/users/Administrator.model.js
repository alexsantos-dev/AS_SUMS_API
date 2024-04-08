import { DataTypes } from 'sequelize'
import sequelize from '../../data/data.config.js'

const Administrator = sequelize.define('Administration', {
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
    typeUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'adm',
        validate: {
            is: 'adm'
        },
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

Administrator.beforeValidate((administrator, options) => {

    if (administrator && administrator.name) {
        const userType = administrator.typeUser
        const currentDate = new Date()
        const seconds = String(currentDate.getSeconds()).padStart(2, '0')
        const minutes = String(currentDate.getMinutes()).padStart(2, '0')
        const hour = String(currentDate.getHours()).padStart(2, '0')
        const year = String(currentDate.getFullYear()).slice(-2)
        const initials = administrator.name.split(' ').map(part => part[0]).join('').toUpperCase()
        administrator.reg = `${userType}-${seconds}${minutes}${hour}-${year}-${initials}`
    }
})


export default Administrator