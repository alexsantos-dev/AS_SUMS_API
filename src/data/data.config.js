import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/data/data.sqlite',
    logging: false
})

export default sequelize