import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/data/data.sqlite'
})

export default sequelize