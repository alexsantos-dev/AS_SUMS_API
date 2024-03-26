import { DataTypes } from 'sequelize'
import sequelize from '../../data/data.config.js'

const Period = sequelize.define('Periods', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    code: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true,
        validate: {
            min: 1,
            max: 4
        }
    }
},
    {
        freezeTableName: true
    }
)

export default Period