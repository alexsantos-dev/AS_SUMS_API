import app from './app.js'
import sequelize from './src/data/data.config.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await sequelize.sync()
    console.log(`✅ connected Port: ${PORT}`)
    console.log(`📚 doc: http://localhost:${PORT}/doc`)
})
