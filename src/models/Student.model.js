import { DataTypes } from 'sequelize'
import sequelize from '../data/data.config.js'

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
            isAlphanumeric: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['active', 'inative']]
            }
        }
    },
    typeUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['admaster', 'adm', 'std']],
            }
        }
    },
},
    {
        freezeTableName: true
    }
)

export default Student


