import React, {useState} from 'react'
import {InputReadOnly, Button, ContactBot} from '../../components'
import avatar from '../../assets/avatar.jpg'
import { useSelector, useDispatch  } from 'react-redux'
import { apiUploadImages, apiUpdateUser } from '../../services'
import { getCurrent } from '../../store/actions'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const EditAccount = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const { userData } = useSelector(state => state.user)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    // console.log(userData)

    const [payload, setPayload] = useState({
        name: userData?.name || '',
        avatar: userData?.avatar || '',
        fbUrl: userData?.fbUrl || '',
        zalo: userData?.zalo || ''
    })
    const handleSubmit = async() => {
        if (payload.name !== '') {
            setError(false)
            // console.log(payload)
            const response = await apiUpdateUser(payload)
            // console.log(response)
            if (response?.data?.err === 0 ) {
                Swal.fire('Thành công !','Cập nhật thông tin cá nhân thành công !','success').then(() => {
                    dispatch(getCurrent())
                })
            }
            else {
                Swal.fire('Thất bại !','Cập nhật thông tin cá nhân không thành công !','error')
            }
        }
        else {
            setError(true)
        }
    }
    const handleUploadFile = async(e) => {
        const image = e.target.files[0]
        e.stopPropagation()
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'de991j7a')
        const response = await apiUploadImages(formData)
        // console.log(response)
        if (response.status === 200) {
            setPayload(prev => ({
                ...prev,
                avatar: response?.data?.secure_url
            }))
        }
    }

  return (
    <div className="px-9 flex flex-col justify-center items-center">
        <h1 className='w-full text-start font-medium text-3xl py-4 border-b'>
            Chỉnh sửa thông tin cá nhân
        </h1>
        <div className="w-3/5 py-4 flex flex-col gap-3">
            <InputReadOnly
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label='Mã thành viên'  
                readOnly
                value={userData?.id?.match(/\d/g).join('')?.slice(0, 6) || ''}
            />
            <InputReadOnly
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label='Số điện thoại'  
                readOnly
                value={userData?.phone || ''}
            />
            <InputReadOnly
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                setValue={setPayload}
                label='Tên hiển thị'  
                value={payload.name}
                name= 'name'
            />
            {error && <small className='text-red-500 italic'>Vui lòng điền tên hiển thị !</small>}
            <InputReadOnly
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                setValue={setPayload}
                label='Số Zalo'  
                value={payload.zalo}
                name= 'zalo'
            />
            <InputReadOnly
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                setValue={setPayload}
                label='Facebook'  
                value={payload.fbUrl}
                name= 'fbUrl'
            />
            <div className="flex items-center gap-40 mt-5" >
                <label htmlFor="password" className='font-semibold'>Mật khẩu</label>
                {userData?.roleCode === 'R1' ?  <span  className="text-blue-700">Đổi mật khẩu</span>
                : <Link to='/he-thong/doi-mat-khau' className="text-blue-700">Đổi mật khẩu</Link>
                }
            </div>
            <div className="flex items-center gap-32 mt-5 mb-10" >
                <label htmlFor="avatar" className='font-semibold'>Ảnh đại diện</label>
                <div>
                    <img src={payload?.avatar || avatar} alt="avatar" className="w-[140px] h-[140px] object-cover rounded-full" />
                    <input onChange={handleUploadFile} type='file' id='avatar' className='appearance-none my-2' />
                </div>
            </div>
            <Button text='Lưu & Cập nhật' bgColor='bg-secondary1' textColor='text-white' 
                onClick={handleSubmit}
            />
        </div>
        <div className='w-full flex justify-center'>
            <ContactBot />
          </div>
    </div>
  )
}

export default EditAccount