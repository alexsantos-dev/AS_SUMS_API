import request from 'supertest'
import app from '../../../index.js'

describe('Users authentication login /usr/login', () => {
    const user = {
        reg: 'adm-085311-24-DA',
        password: '7803-Aob'
    }

    it('Should be return a token', async () => {
        const res = await request(app).post('/usr/login').send(user)
        expect(res.status).toBe(200)
    })
})
