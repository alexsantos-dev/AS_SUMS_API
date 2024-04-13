import app from '../../index.js'
import request from 'supertest'

const stdId = "40d972e7-1dbe-4204-8e4d-da34f6dff278"
const admId = "41039de7-b006-4bcf-9c1c-1c395407fca7"

describe('AuthMiddleware', () => {
    it('should return status 401 and a error message', async () => {
        const res = await request(app)
            .get(`/std/grades/${stdId}`)
            .set('Authorization', 'Bearer ')
        expect(res.status).toBe(401)
        expect(res.body.err).toBe('Token not provided or invalid')
    })
    it('should return status 409 and a error message', async () => {
        const loginResponse = await request(app)
            .post('/usr/login')
            .send({
                reg: 'std-142518-24-JS',
                password: '7803-Aob'
            })
        const studentToken = loginResponse.body.token
        const res = await request(app)
            .get(`/adm/students/${admId}`)
            .set('Authorization', `Bearer ${studentToken}`)
        expect(res.status).toBe(409)
        expect(res.body.err).toBe('type user unauthorized!')
    })
    it('should return status 403 and a error message', async () => {
        const tokenExpired = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlVXNlciI6ImFkbSIsImlhdCI6MTcxMjE4MTA3NywiZXhwIjoxNzEyMTgxMjU3fQ.jCjxyk5sNEtkECuMKraG-eh0bTjqRrCAXolbnjNnnz4'

        const res = await request(app)
            .get(`/adm/students/${admId}`)
            .set('Authorization', `Bearer ${tokenExpired}`)
        expect(res.status).toBe(403)
        expect(res.body.Authorization.message).toBe('jwt expired')
    })
})