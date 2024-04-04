import app from '../../index.js'
import request from 'supertest'

describe('AuthMiddleware', () => {
    it('should return status 401 and a error message', async () => {
        const res = await request(app)
            .get('/adm/students')
            .set('Authorization', 'Bearer ')
        expect(res.status).toBe(401)
        expect(res.body.err).toBe('Token not provided or invalid')
    })
    it('should return status 409 and a error message', async () => {
        const loginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'std-270616-24-JS',
                password: '7803-Aob'
            })
        const studentToken = loginResponse.body.token
        const res = await request(app)
            .get('/adm/students')
            .set('Authorization', `Bearer ${studentToken}`)
        expect(res.status).toBe(409)
        expect(res.body.err).toBe('Forbidden: Not a adm is std')
    })
    it('should return status 403 and a error message', async () => {
        const tokenExpired = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlVXNlciI6ImFkbSIsImlhdCI6MTcxMjE4MTA3NywiZXhwIjoxNzEyMTgxMjU3fQ.jCjxyk5sNEtkECuMKraG-eh0bTjqRrCAXolbnjNnnz4'

        const res = await request(app)
            .get('/adm/students')
            .set('Authorization', `Bearer ${tokenExpired}`)
        expect(res.status).toBe(403)
        expect(res.body.Authorization.message).toBe('jwt expired')
    })
})