import db from '../models'

//GET ALL Price
export const getProvincesService = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let response = await db.Province.findAll({
                raw:true,
                attributes: ['code','value']
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get all province',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}

