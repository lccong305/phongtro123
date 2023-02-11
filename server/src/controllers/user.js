import * as service from '../services/user'

export const getCurrent = async (req, res) => {
    const { id } = req.user
    try {
        const response = await service.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}
export const getUsers = async (req, res) => {
    try {
        const response = await service.getUsers(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}
export const deleteUser = async (req, res) => {
    try {
        const { ids } = req.query
        if (!ids) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await service.deleteUser(ids)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}
export const updateUserAdmin = async (req, res) => {
    try {
        const { id } = req.user
        if (!req.body) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await service.updateUserAdmin(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}
export const updateUser = async(req,res) => {
    const {id } = req.user
    const  payload  = req.body
    try {
        if (!payload) return res.status(400).json({
            err: 1,
            msg: 'fail up payload update user controller'
        })
        const response = await service.updateUser(payload, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at price controller' + error
        })
    }
}

export const updatePasswoodUser = async(req,res) => {
    const {id } = req.user
    const  { oldPassword, newPassword }  = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'fail up payload update passwood user controller'
        })
        const response = await service.updatePasswoodUser({ oldPassword, newPassword }, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at price controller' + error
        })
    }
}


export const getUserByPhone = async (req, res) => {
    const { phone } = req.query
    try {
        const response = await service.getUserByPhone({phone})
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

export const createPasswoodUser = async(req,res) => {
    const  { phone, password }  = req.body
    try {
        if (!phone) return res.status(400).json({
            err: 1,
            msg: 'fail up payload update passwood user controller'
        })
        const response = await service.createPasswoodUser({ phone, password })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at price controller' + error
        })
    }
}