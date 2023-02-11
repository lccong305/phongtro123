import axiosConfig from '../axiosConfig'

export const apiRegister = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'post',
                url: '/api/v1/auth/register',
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
// export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
//     try {
//         const response = await axiosConfig({
//             method: 'post',
//             url: '/api/v1/auth/register',
//             data: payload
//         })
//         resolve(response)

//     } catch (error) {
//         reject(error)
//     }
// })

export const apiLogin = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'post',
                url: '/api/v1/auth/login',
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
