import location_hcm from '../../src/assets/location_hcm.jpg'
import location_hn from '../../src/assets/location_hn.jpg'
import location_dn from '../../src/assets/location_dn.jpg'



export const path = {
    HOME: '/*',
    HOME__PAGE: ':page',
    LOGIN: 'login',
    CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro',
    CHO_THUE_CAN_HO: 'cho-thue-can-ho',
    CHO_THUE_NHA: 'cho-thue-nha',
    HUONG_DAN_SU_DUNG: 'huong-dan-su-dung',
    DETAIL_POST__TITLE__POSTID: 'chi-tiet/:title/:postId',
    SEARCH: 'tim-kiem',
    SYSTEM: '/he-thong/*',
    CREATE_PORST: 'tao-moi-bai-dang',
    MANAGE_PORST: 'quan-ly-bai-dang',
    EDIT_ACCOUNT: 'thong-tin-ca-nhan',
    CHANGE_PASSWORD: 'doi-mat-khau',
    DETAIL: '/chi-tiet/',
    DETAIL_All: 'chi-tiet/*',
    MANAGE_USER_ADMIN: 'quan-ly-thanh-vien',
    MANAGE_POST_ADMIN: 'quan-ly-bai-dang-admin',
    POST_LIKE: 'bai-dang-yeu-thich',
    FORGOT_PASSWORD: 'quen-mat-khau'

}
export const textHomePage = {
    HOME_TITLE: 'Kênh thông tin Phòng trọ số 2 Việt Nam',
    HOME_DISCRIPTION: 'Kênh thông tin Phòng Trọ số 2 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, hiệu quả nhanh chống và cực kỳ hữu ích với số lượng tin đăng và lượt truy cập lớn.'
}
export const locationPhongtro = [
    {
        name: 'Phòng trọ Hồ Chí Minh',
        image: location_hcm,
        id: 'hcm',
        query: {
            categoryCode: 'CTPT',
            address:'Thành phố Hồ Chí Minh'
        }
    },
    {
        name: 'Phòng trọ Hà Nội',
        image: location_hn,
        id: 'hn',
        query: {
            categoryCode: 'CTPT',
            address:'Thành phố Hà Nội'
        }
    },
    {
        name: 'Phòng trọ Đà Nẵng',
        image: location_dn,
        id: 'dn',
        query: {
            categoryCode: 'CTPT',
            address:'Thành phố Đà Nẵng'
        }
    },
]

export const locationCanho = [
    {
        name: 'Căn hộ Hồ Chí Minh',
        image: location_hcm,
        id: 'hcm',
        query: {
            categoryCode: 'CTCH',
            address:'Thành phố Hồ Chí Minh'
        }
    },
    {
        name: 'Căn hộ Hà Nội',
        image: location_hn,
        id: 'hn',
        query: {
            categoryCode: 'CTCH',
            address:'Thành phố Hà Nội'
        }
    },
    {
        name: 'Căn hộ Đà Nẵng',
        image: location_dn,
        id: 'dn',
        query: {
            categoryCode: 'CTCH',
            address:'Thành phố Đà Nẵng'
        }
    },
]

export const locationNha = [
    {
        name: 'Nhà Hồ Chí Minh',
        image: location_hcm,
        id: 'hcm',
        query: {
            categoryCode: 'CTN',
            address:'Thành phố Hồ Chí Minh'
        }
    },
    {
        name: 'Nhà Hà Nội',
        image: location_hn,
        id: 'hn',
        query: {
            categoryCode: 'CTN',
            address:'Thành phố Hà Nội'
        }
    },
    {
        name: 'Nhà Đà Nẵng',
        image: location_dn,
        id: 'dn',
        query: {
            categoryCode: 'CTN',
            address:'Thành phố Đà Nẵng'
        }
    },
]