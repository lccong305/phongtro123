import axiosConfig from '../axiosConfig'
import axiosDefault from 'axios'


export const apiGetPrices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: '/api/v1/price/all',
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
export const apiGetAreas = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: '/api/v1/area/all',
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
export const apiGetProvinces = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: '/api/v1/province/all',
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPublicProvinces = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'get',
                url: 'https://vapi.vnappmob.com/api/province',

            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPublicDistricts = (province_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'get',
                url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,

            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}
export const apiGetPublicWards = (district_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'get',
                url: `https://vapi.vnappmob.com/api/province/ward/${district_id}`,

            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}