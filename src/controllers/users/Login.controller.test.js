import request from 'supertest'
import app from '../../../app.js'

describe('POST Users authentication login /usr/login', () => {

    const user = {
        reg: 'adm-524018-24-DA',
        password: '7803-Aob'
    }

    it('Should be return a token', async () => {
        const res = await request(app).post('/usr/login').send(user)
        expect(res.status).toBe(200)
        expect(res.body.msg).toBe('User logged successfully!')
    })

    const nullUser = {
        reg: '',
        password: ''
    }

    it('Shold be return a not found error', async () => {
        const res = await request(app).post('/usr/login').send(nullUser)
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('User not found!')
    })

    const userWrongPassword = {
        reg: 'adm-524018-24-DA',
        password: '8732yg2ry'
    }

    it('Shold be return a wrong password error', async () => {
        const res = await request(app).post('/usr/login').send(userWrongPassword)
        expect(res.status).toBe(409)
        expect(res.body.error).toBe('Wrong password!')
    })
})
