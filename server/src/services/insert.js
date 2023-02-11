import db from '../models'
import bcryptjs from 'bcryptjs'
import { v4 } from 'uuid'
import chothuecanho from '../../data/chothuecanho.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import chothuenha from '../../data/nhachothue.json'
import { getNumberFromString, getNumberFromStringv2 } from '../ultils/common'
import generateCode from '../ultils/generateCode'
import { dataPrice, dataArea } from '../ultils/data'

require('dotenv').config()

const dataBody = [
    {
        body: chothuephongtro.body,
        code: 'CTPT'
    },
    {
        body: chothuecanho.body,
        code: 'CTCH'
    },
    {
        body: chothuenha.body,
        code: 'CTN'
    }
]

const hashPassword = password => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(12))
}


export const insertService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const provinceCodes = []
            const labelCodes = []
            dataBody.forEach(cate => {
                cate.body.forEach(async (item) => {
                    let postId = v4()
                    let labelCode = generateCode(item?.header?.class?.classType).trim()
                    labelCodes?.every(item => item?.code !== labelCode) && labelCodes.push({
                        code: labelCode,
                        value: item?.header?.class?.classType.trim()
                    })
                    let attributeId = v4()
                    let userId = v4()
                    let overviewId = v4()
                    let imageId = v4()
                    let currentArea = getNumberFromString(item?.header?.attributes?.acreage)
                    let currentPrice = getNumberFromString(item?.header?.attributes?.price)
                    let provinceCode = generateCode(item?.header?.address?.split(',').slice(-1)[0])
                    provinceCodes?.every(item => item?.code !== provinceCode) && provinceCodes.push({
                        code: provinceCode,
                        value: item?.header?.address?.split(',').slice(-1)[0]
                    })


                    await db.Post.create({
                        id: postId,
                        title: item?.header?.title,
                        star: item?.header?.star,
                        labelCode: labelCode,
                        address: item?.header?.address,
                        attributeId,
                        categoryCode: cate.code,
                        description: JSON.stringify(item?.mainContent?.content),
                        status: 'checked',
                        userId,
                        overviewId,
                        imageId,
                        areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
                        priceCode: dataPrice.find(price => price.max > currentPrice && price.min <= currentPrice)?.code,
                        provinceCode,
                        priceNumber: getNumberFromStringv2(item?.header?.attributes?.price),
                        areaNumber: getNumberFromStringv2(item?.header?.attributes?.acreage)
                    })
                    await db.Attribute.create({
                        id: attributeId,
                        price: item?.header?.attributes.price,
                        acreage: item?.header?.attributes.acreage,
                        published: item?.header?.attributes.published,
                        hashtag: item?.header?.attributes.hashtag,
                    })
                    await db.Image.create({
                        id: imageId,
                        image: JSON.stringify(item?.images)
                    })

                    await db.Overview.create({
                        id: overviewId,
                        code: item?.overview?.content.find(i => i.name === "Mã tin:")?.content,
                        area: item?.overview?.content.find(i => i.name === "Khu vực")?.content,
                        type: item?.overview?.content.find(i => i.name === "Loại tin rao:")?.content,
                        target: item?.overview?.content.find(i => i.name === "Đối tượng thuê:")?.content,
                        bonus: item?.overview?.content.find(i => i.name === "Gói tin:")?.content,
                        created: item?.overview?.content.find(i => i.name === "Ngày đăng:")?.content,
                        expire: item?.overview?.content.find(i => i.name === "Ngày hết hạn:")?.content,

                    })

                    await db.User.create({
                        id: userId,
                        name: item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                        password: hashPassword('123456'),
                        phone: item?.contact?.content.find(i => i.name === "Điện thoại:")?.content,
                        zalo: item?.contact?.content.find(i => i.name === "Zalo")?.content,

                    })
                    await db.Province.findOrCreate({
                        where: { code: provinceCode },
                        defaults: {
                            code: provinceCode,
                            value: item?.header?.address?.split(',').slice(-1)[0]
                        }

                    })


                })
            })

            provinceCodes?.forEach(async (item) => {
                await db.Province.create(item)
            })
            labelCodes?.forEach(async (item) => {
                await db.Label.create(item)
            })


            resolve('oke !')
        } catch (error) {
            reject(error);
        }
    })
}

export const createPriceAndArea = () => {
    return new Promise(async (resolve, reject) => {
        try {
            dataPrice.forEach(async (item) => {
                await db.Price.create({
                    code: item?.code,
                    value: item?.value,
                })
            })
            dataArea.forEach(async (item) => {
                await db.Area.create({
                    code: item?.code,
                    value: item?.value,
                })
            })

            resolve('add prices ard areas oke !')
        } catch (error) {
            reject(error);
        }
    })
}
