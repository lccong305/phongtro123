import db from '../models'
import bcryptjs from 'bcryptjs'


//GET current user
export const getOne = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.findOne({
                where: { id },
                raw: true,
                attributes: {
                    exclude: ['password']
                }
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get user',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}
export const deleteUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.destroy({
                where: { id: ids },
            })
            resolve({
                err: response ? 0 : 1,
                msg: response + ' user(s) deleted',
            })
        } catch (error) {
            reject(error);
        }
    })
}
export const updateUserAdmin = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.update(data, {
                where: { id: data.id }
            })
            resolve({
                err: response[0] > 0 ? 0 : 1,
                msg: response[0] + ' user(s) updated',
            })
        } catch (error) {
            reject(error);
        }
    })
}
export const getUsers = ({ page, limit, order, ...query }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const queries = { nest: true }
            const offset = (!page || +page <= 1) ? 0 : (+page - 1)
            const fLimit = limit || process.env.LIMIT
            queries.offset = offset * +fLimit
            queries.limit = +fLimit
            if (order) queries.order = [order]
            let response = await db.User.findAndCountAll({
                where: query,
                ...queries,
                attributes: {
                    exclude: ['password', 'roleCode', 'positionCode']
                },
                include: [
                    { model: db.Position, attributes: ['code', 'value'], as: 'positionData' },
                    { model: db.Role, attributes: ['code', 'value'], as: 'roleData' },
                    { model: db.Post, attributes: ['id'], as: 'users' },
                ]
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get all user',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}

export const updateUser = (payload, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.update(payload, {
                where: { id }
            })
            resolve({
                err: response[0] > 0 ? 0 : 1,
                msg: response[0] > 0 ? 'update user oke !' : 'fail to update user',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}

const hashPassword = password => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(12))
}

export const updatePasswoodUser = ({ oldPassword, newPassword }, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { id },
                raw: true
            })
            const isCorrectPassword = response && bcryptjs.compareSync(oldPassword, response.password)
            // console.log(isCorrectPassword)
            if (isCorrectPassword) {
                await db.User.update(
                    {
                        password: hashPassword(newPassword)
                    }
                    ,
                    {
                        where: { id }
                    }
                )
                resolve({
                    err: 0,
                    msg: 'update user oke !',
                })
            }
            else {
                resolve({
                    err: 1,
                    msg: 'update password user fail !',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}


export const getUserByPhone = ({ phone }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(phone)
            let response = await db.User.findOne({
                where: { phone },
                attributes: {
                    exclude: ['password', 'roleCode', 'positionCode']
                },
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get user',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}


export const createPasswoodUser = ({ phone, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(isCorrectPassword)

            await db.User.update(
                {
                    password: hashPassword(password)
                }
                ,
                {
                    where: { phone }
                }
            )
            resolve({
                err: 0,
                msg: 'update user oke !',
            })
        } catch (error) {
            reject(error);
        }
    })
}

