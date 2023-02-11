import db from '../models'
const { Op } = require('sequelize')
import { v4 as generateId } from 'uuid'
import generateCode from '../ultils/generateCode'
import moment from 'moment'
import generateDate from '../ultils/generateDate'

export const getPosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Post.findAll({
                raw: true,
                nest: true,
                order: [['createdAt', 'DESC']],
                // attributes: ['id','title','star']
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image']
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'hashtag', 'published']
                    },
                    {
                        model: db.Overview,
                        as: 'overviews',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: db.User,
                        as: 'users',
                        attributes: ['name','phone','zalo','fbUrl']
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description','status']
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke !' : 'Fail get all posts service!',
                response

            })
        } catch (error) {
            reject(error);
        }
    })
}


export const getPostsLimitService = ({ page,limit,order, address, ...query }, { priceNumber, areaNumber }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offset = !page || +page <= 1 ? 0 : (+page - 1)
            const queries = { raw: true, nest: true}
            const lim = +limit || +process.env.LIMIT
            queries.limit = lim
            queries.offset = +lim * offset
            if (priceNumber) query.priceNumber = { [Op.between]: priceNumber }
            if (areaNumber) query.areaNumber = { [Op.between]: areaNumber }
            if (order) {queries.order = [order]} else {queries.order = [['createdAt', 'DESC']] }
            if (address) query.address = {
                [Op.or]: [
                    { [Op.substring]: address[0] },
                    { [Op.substring]: address[0]?.replace('Quận ', '') },
                    { [Op.substring]: address[0]?.replace('Huyện ', '') },
                    { [Op.substring]: address[0]?.replace('Tỉnh ', '') },
                    { [Op.substring]: address[0]?.replace('Thành phố ', '') }
                ]
            }
            let response = await db.Post.findAndCountAll({
                where: query,
                ...queries,
                // order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image']
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'hashtag', 'published']
                    },
                    {
                        model: db.Overview,
                        as: 'overviews',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: db.User,
                        as: 'users',
                        attributes: ['id','avatar','name','phone','zalo','fbUrl','positionCode']
                    },
                ],
                attributes: ['id','title','star','address','categoryCode','description','priceCode','status'],
             })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke !' : 'Fail get all posts service!',
                response

            })
        } catch (error) {
            reject(error);
        }
    })
}

export const getNewPostsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Post.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image']
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'hashtag', 'published']
                    },
                    {
                        model: db.Overview,
                        as: 'overviews',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },
                ],
                attributes: ['id', 'title', 'star', 'createdAt','status'],
                offset: 0,
                limit: 10,
                order: [['createdAt', 'DESC']]
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke !' : 'Fail get all posts service!',
                response

            })
        } catch (error) {
            reject(error);
        }
    })
}


export const createNewPostsService = (body, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const attributeId = generateId()
            const imageId = generateId()
            const overviewId = generateId()
            const labelCode = generateCode(body.label)
            const hashtag = `#${Math.floor(Math.random() * Math.pow(10,6))}`
            const currentDate = generateDate()
        
            await db.Post.create({
                id: generateId(),
                title: body.title || null,
                labelCode: labelCode,
                address: body.address || null,
                attributeId,
                categoryCode: body.categoryCode || null,
                description: JSON.stringify(body.description) || null,
                status: 'unChecked',
                userId,
                overviewId,
                imageId,
                areaCode: body.areaCode || null,
                priceCode: body.priceCode || null,
                provinceCode: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')),
                priceNumber: body.priceNumber,
                areaNumber: body.areaNumber
            })
            await db.Attribute.create({
                id: attributeId,
                price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${body.priceNumber} triệu/tháng`,
                acreage: `${body.areaNumber} m2`,
                published: moment(new Date).format('DD/MM/YYYY'),
                hashtag,
            })
            await db.Image.create({
                id: imageId,
                image: JSON.stringify(body.images)
            })
            await db.Overview.create({
                id: overviewId,
                code: hashtag,
                area: body.area,
                type: body.category,
                target: body.target,
                bonus: 'Tin miễn phí',
                created: currentDate.today,
                expire: currentDate.expireDay,

            })
            await db.Province.findOrCreate({
                where: {
                    [Op.or]: [
                        { value: body?.province?.replace('Thành phố ', '') },
                        { value: body?.province?.replace('Tỉnh ', '') }
                    ]
                },
                defaults: {
                    code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')),
                    value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố ', '') : body?.province?.replace('Tỉnh ', '')
                }
            })

            await db.Label.findOrCreate({
                where: {
                    code: labelCode
                },
                defaults: {
                    code: labelCode,
                    value: body.label
                }
            })
            resolve({
                err: 0,
                msg: 'oke !',

            })
        } catch (error) {
            reject(error);
        }
    }) 
}


export const getPostsLimitAdminService = (page, query, id) => {
    return new Promise(async(resolve, reject) => {
        // console.log({priceNumber,areaNumber});
        try {
            let offset = !page || +page <= 1? 0 : (+page - 1)
            const queries = {...query,userId: id}

            let response = await db.Post.findAndCountAll({
                where: queries,
                raw: true,
                nest: true,
                order: [['createdAt','DESC']],
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image']
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price','acreage','hashtag','published']
                    },
                    {
                        model: db.User,
                        as: 'users',
                        attributes: ['name','phone','zalo']
                    },
                    {
                        model: db.Overview,
                        as: 'overviews',
            
                    },
                ],
                // attributes: ['id','title','star','address','description','priceCode'],
                offset: offset * +process.env.LIMIT, 
                limit: +process.env.LIMIT
             })
             resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke !': 'Fail get all posts service!',
                response

             })
        } catch (error) {
            reject(error);
        }
    }) 
}

export const updatePost = ({ postId,overviewId, attributeId, imageId ,... body}) => {
    return new Promise(async(resolve, reject) => {
        try {
            const labelCode = generateCode(body.label)
            
            await db.Post.update({
                title: body.title || null,
                labelCode: labelCode,
                address: body.address || null,
                categoryCode: body.categoryCode || null,
                description: JSON.stringify(body.description) || null,
                status: 'unChecked',
                areaCode: body.areaCode || null,
                priceCode: body.priceCode || null,  
                provinceCode: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố','')) : generateCode(body?.province?.replace('Tỉnh','')),
                priceNumber: body.priceNumber,
                areaNumber : body.areaNumber
             },{
                where: {id: postId}
             })
             await db.Attribute.update({
                price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${body.priceNumber} triệu/tháng`,
                acreage: `${body.areaNumber} m2`,
            },{
                where: {id: attributeId}
             })
            await db.Image.update({
                image :  JSON.stringify(body.images)
            },{
                where: {id: imageId}
             })
            await db.Overview.update({
                area: body.area,
                type: body.category,
                target: body.target,
            },{
                where: {id: overviewId}
             })
            await db.Province.findOrCreate({
                where: {
                    [Op.or]: [
                        { value: body?.province?.replace('Thành phố ','') },
                        { value: body?.province?.replace('Tỉnh ','') }
                      ]
                },
                defaults: {
                    code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố','')) : generateCode(body?.province?.replace('Tỉnh','')),
                    value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố ','') : body?.province?.replace('Tỉnh ','')
                }
            })

            await db.Label.findOrCreate({
                where: {
                    code: labelCode
                },
                defaults: {
                    code: labelCode,
                    value: body.label
                }
            })
             resolve({
                err: 0,
                msg: 'update oke !',

             })
        } catch (error) {
            reject(error);
        }
    }) 
}


export const deletePost = ( postId ) => {
    return new Promise(async(resolve, reject) => {
        // console.log({priceNumber,areaNumber});
        try {
            let response = await db.Post.destroy({
                where: {id : postId},
             })
             resolve({
                err: response > 0 ? 0 : 1,
                msg: response > 0 ? 'delete oke !': 'Fail delete posts service!',
             })
        } catch (error) {
            reject(error);
        }
    }) 
}
export const deletePostAdmin = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Post.destroy({
                where: { id },
            })
            resolve({
                err: response ? 0 : 1,
                msg: response + ' post(s) deleted',
            })
        } catch (error) {
            reject(error);
        }
    })
}
export const updatePostAdmin = ({ id, ...data }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await Promise.all([
                db.Post.update(
                    { 
                        title: data.title ,
                        status: data.status,
                        star: data.star,
                    }, 
                    {
                    where: { id }
                    }
                ),
                db.Overview.update({ expire: moment(data.expire).format('DD/MM/YYYY') }, {
                    where: { id: data.oid }
                })
            ])
            resolve({
                err: response ? 0 : 1,
                msg: ' user(s) updated',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}


export const createPostLike = (id, postId ) => {
    return new Promise(async(resolve, reject) => {
        // console.log({priceNumber,areaNumber});
        try {
            let response = await db.PostLike.create({
                userId: id,
                postId
             })
             resolve({
                err: 0,
                msg: 'postlike oke !',
                response
             })
        } catch (error) {
            reject(error);
        }
    }) 
}

export const deletePostLike = (id, postId ) => {
    return new Promise(async(resolve, reject) => {
        // console.log({priceNumber,areaNumber});
        try {
            let response = await db.PostLike.destroy({
                where: {
                    userId : id,
                    postId: postId
                },
             })
             resolve({
                err: response > 0 ? 0 : 1,
                msg: response > 0 ? 'delete oke !': 'Fail delete posts service!',
             })
        } catch (error) {
            reject(error);
        }
    }) 
}

export const getPostLike = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.PostLike.findAll({
                where: {
                    userId: id
                },
                raw: true,
                include: [
                    // {
                    //     model: db.Post,
                    //     as: 'posts',
                    //     attributes: ['title','star']
                    // },
                    // {
                    //     model: db.Image,
                    //     as: 'images',
                    //     attributes: ['image']
                    // },
                    // {
                    //     model: db.Attribute,
                    //     as: 'attributes',
                    //     attributes: ['price', 'acreage', 'hashtag', 'published']
                    // },
                    // {
                    //     model: db.Overview,
                    //     as: 'overviews',
                    //     attributes: {
                    //         exclude: ['createdAt', 'updatedAt']
                    //     }
                    // },
                    // {
                    //     model: db.User,
                    //     as: 'users',
                    //     attributes: ['name','phone','zalo','fbUrl']
                    // },
                ],
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke !' : 'Fail get all posts like service!',
                response

            })
        } catch (error) {
            reject(error);
        }
    })
}