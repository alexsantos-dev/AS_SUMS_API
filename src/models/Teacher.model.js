import { DataTypes } from 'sequelize'
import sequelize from '../data/data.config'

const Teacher = sequelize.define('Teachers', {
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
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['english', 'mathematics', 'science', 'social studies', 'foreign languages', 'arts', 'electives']]
            }
        },
        defaultValue: 'english'
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
        validate: {
            isIn: {
                args: [['dir', 'tchr', 'std']],
            }
        }
    },
},
    {
        freezeTableName: true
    }
)

export default Teacher
