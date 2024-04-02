import app from './index.js'
import sequelize from './src/data/Data.config.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await sequelize.sync()
    console.log(`connected ✅ Port: ${PORT}`)
})
