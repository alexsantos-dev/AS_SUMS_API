import Administrator from "../models/users/Administrator.model.js"
import bcrypt from "bcrypt"
import sequelize from "./Data.config.js"

async function seedAdmistrator() {
    try {
        Administrator.sync()
        const hashPassword = await bcrypt.hash('7803-Aob', 10)

        const adm = await Administrator.create({
            name: 'Don Adminastro',
            sex: 'm',
            phone: '99-123456789',
            email: 'admin@example.com',
            password: hashPassword,
        })
        console.log("Adm successfully seeded")
        return adm

    }

    catch (error) {
        console.error('Error entering seed data for admin:', error)
    }
}

seedAdmistrator()
    .then(() => {
        sequelize.close()
    })
    .catch((error) => {
        console.error('Error when executing seed script:', error)
        sequelize.close()
    })
