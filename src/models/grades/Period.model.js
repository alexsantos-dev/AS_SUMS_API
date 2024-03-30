import { DataTypes } from 'sequelize'
import sequelize from '../../data/Data.config.js'

const Period = sequelize.define('Periods', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            min: 1,
            max: 4
        }
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