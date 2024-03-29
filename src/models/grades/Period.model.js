import { DataTypes } from 'sequelize'
import sequelize from '../../data/Data.config.js'

const Period = sequelize.define('Periods', {
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
            isIn: [['Period_1', 'Period_2', 'Period_3', 'Period_4']]
        }
    }
},
    {
        freezeTableName: true
    }
)

export default Period