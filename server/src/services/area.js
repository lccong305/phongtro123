import db from '../models'

//GET ALL Areas
export const getAreasService = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let response = await db.Area.findAll({
                raw:true,
                attributes: ['code','value']
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get all area',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}