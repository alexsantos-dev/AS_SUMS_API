import Period from "./src/models/grades/Period.model.js"
import sequelize from './src/data/Data.config.js'

async function createPeriod() {
    try {
        await Period.sync()
        const period = await Period.create({
            name: 'Period_4'
        })
        console.log('Period added successfully!')
        return period
    }
    catch (error) {
        console.error('Error entering seed data for period:', error)
    }
}

createPeriod()
    .then(() => {
        sequelize.close()
    })
    .catch((error) => {
        console.error('Error when executing periodseed script:', error)
        sequelize.close()
    })