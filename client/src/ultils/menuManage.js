import icons from './icons'

const { TfiPencilAlt, BiBookContent, BiUserCircle, RiHeartLine } = icons

const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <TfiPencilAlt color='#f73859' />
    },
    {
        id: 2,
        text: 'Quản lí tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <BiBookContent color='#f73859' />
    },
    {
        id: 3,
        text: 'Quản lí tin đăng (Admin)',
        path: '/he-thong/quan-ly-bai-dang-admin',
        icon: <BiBookContent color='#f73859'/>
    },
    {
        id: 4,
        text: 'Quản lý thành viên (Admin)',
        path: '/he-thong/quan-ly-thanh-vien',
        icon: <BiBookContent color='#f73859' />
    },
    {
        id: 5,
        text: 'Thông tin tài khoản',
        path: '/he-thong/thong-tin-ca-nhan',
        icon: <BiUserCircle color='#f73859' />

    },
    {
        id: 6,
        text: 'Tin yêu thích',
        path: 'bai-dang-yeu-thich',
        icon: <RiHeartLine color='#f73859' />

    },
]
export default menuManage