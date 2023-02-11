import db from '../models'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
require('dotenv').config()


const hashPassword = password => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(12))
}

export const registerService = ({ phone, password, name }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { phone },
                defaults: {
                    id: v4(),
                    name,
                    password: hashPassword(password),
                    phone,
                    roleCode: 'R2',
                    positionCode: 'P1'
                }
            })
            const token = response[1] && jwt.sign({
                id: response[0].id,
                phone: response[0].phone,
                roleCode: response[0].roleCode
            },
                process.env.SECRET_KEY,
                { expiresIn: '2d' }
            )
            resolve({
                err: token ? 0 : 2,
                msg: token ? 'Register is succesfully' : 'Phone numer has been axist',
                token: token || null,
            })
        } catch (error) {
            reject(error);
        }
    })
}

export const loginService = ({ phone, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { phone },
                raw: true
            })
            const isCorrectPassword = response && bcryptjs.compareSync(password, response.password)
            const token = isCorrectPassword && jwt.sign({
                id: response.id,
                phone: response.phone,
                roleCode: response.roleCode
            },
                process.env.SECRET_KEY,
                { expiresIn: '2d' }
            )
            resolve({
                err: token ? 0 : 2,
                msg: token ? 'Login is succesfully' : response ? 'Password is wrong !' : 'Phonenumber not found !',
                token: token || null,
            })
        } catch (error) {
            reject(error);
        }
    })
}