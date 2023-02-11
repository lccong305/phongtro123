import icons from './icons'

const { TfiPencilAlt, BiBookContent, BiUserCircle, RiHeartLine, BiMessageRounded } = icons

const menuSideBar = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <TfiPencilAlt />
    },
    {
        id: 2,
        text: 'Quản lí tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <BiBookContent />
    },
    {
        id: 3,
        text: 'Quản lí tin đăng (Admin)',
        path: '/he-thong/quan-ly-bai-dang-admin',
        icon: <BiBookContent />
    },
    {
        id: 4,
        text: 'Quản lý thành viên (Admin)',
        path: '/he-thong/quan-ly-thanh-vien',
        icon: <BiBookContent />
    },
    {
        id: 5,
        text: 'Thông tin cá nhân',
        path: '/he-thong/thong-tin-ca-nhan',
        icon: <BiUserCircle />

    },
    {
        id: 6,
        text: 'Liên hệ',
        path: '/he-thong/lien-he',
        icon: <BiMessageRounded />

    },

]
export default menuSideBar