import cors from 'cors'

const configureCors = (app) => {
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
        allowedHeaders: 'Content-Type, Authorization',
    }
    app.use(cors(corsOptions))
}

export default configureCors