import { DataTypes } from 'sequelize'
import sequelize from '../../data/Data.config.js'

const Discipline = sequelize.define('Disciplines', {
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
            isIn: [['Matemathics', 'Science', 'Arts', 'English', 'Sociology']]
        },
    }
},
    {
        freezeTableName: true
    }
)

export default Discipline
