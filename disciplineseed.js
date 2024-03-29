import sequelize from './src/data/Data.config.js'
import Discipline from './src/models/grades/Discipline.model.js'

async function createDiscipline() {
    try {
        await Discipline.sync()
        const discipline = await Discipline.create({
            name: 'Sociology'
        })
        console.log('Discipline added successfully!')
        return discipline
    } catch (error) {
        console.error('Error entering seed data for discipline:', error)
    }
}

createDiscipline()
    .then(() => {
        sequelize.close()
    }).catch((error) => {
        console.error('Error when executing disciplineseed script:', error)
        sequelize.close()
    })