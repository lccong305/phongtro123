import axiosConfig from '../axiosConfig'

export const apiGetCurrent = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: '/api/v1/user/get-current',
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
export const apiGetUsers = (q) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: '/api/v1/user/',
                params: q
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
export const apiDeleteUsers = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'delete',
                url: '/api/v1/user/',
                params: { ids }
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
export const apiUpdateUsers = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'put',
                url: '/api/v1/user/',
                data
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}

export const apiUpdateUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'put',
                url: 'http://localhost:5000/api/v1/user/update',
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}

export const apiUpdatePasswoodUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'put',
                url: 'http://localhost:5000/api/v1/user/update-passwood',
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetUserByPhone = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: 'http://localhost:5000/api/v1/user/get-user',
                params: payload
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}

export const apiCreateNewPassword = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'put',
                url: 'http://localhost:5000/api/v1/user/create-passwood',
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}