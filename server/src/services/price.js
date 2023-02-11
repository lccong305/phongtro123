import db from '../models'

//GET ALL Price
export const getPricesService = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let response = await db.Price.findAll({
                raw:true,
                attributes: ['code','value']
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get all price',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}

