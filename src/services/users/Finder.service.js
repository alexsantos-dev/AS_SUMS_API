import sequelize from '../../data/Data.config.js'

export async function globalFindOneByReg(reg) {
    try {
        const allModels = Object.values(sequelize.models)

        for (const model of allModels) {
            const result = await model.findOne({
                where: {
                    reg: reg
                }
            })
            return result
        }
    }
    catch (error) {
        console.error(error)
    }
}



