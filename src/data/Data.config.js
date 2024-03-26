import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/src/data/Data.sqlite'
})

export default sequelize