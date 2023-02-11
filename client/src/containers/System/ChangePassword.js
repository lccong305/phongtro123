import React, {useState} from 'react'
import {InputReadOnly, Button, ContactBot} from '../../components'
import { useSelector, useDispatch  } from 'react-redux'
import {  apiUpdatePasswoodUser } from '../../services'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'

const ChangePassword = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
      oldPassword: '',
      newPassword: '',
    })

    const handleSubmit = async() => {
      const validatePayload = validate(payload, setInvalidFields)
      if (validatePayload === 0) {
        const response = await apiUpdatePasswoodUser(payload)
        // console.log(response)
        if (response?.data.err === 0) {
          Swal.fire('Thành công !','Đổi mật khẩu tài khoản thành công !','success').then(() => {
            setPayload({
              oldPassword: '',
              newPassword: '',
            })
        })
        }
        else {
          Swal.fire('Thất bại !','Đổi mật khẩu tài khoản không thành công !','error').then(() => {
            setPayload({
              oldPassword: '',
              newPassword: '',
            })
        })
        }
      }
    }
  return (
    <div className="px-9 flex flex-col justify-center items-center">
        <h1 className='w-full text-start font-medium text-3xl py-4 border-b'>
            Đổi mật khẩu
        </h1>
        <div className="w-3/5 py-4 flex flex-col gap-3">
            <InputReadOnly
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label='Mật khẩu cũ'  
                value={payload.oldPassword}
                setValue={setPayload}
                name='oldPassword'
                password='password'
            />
            <InputReadOnly
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label='Mật khẩu mới'  
                value={payload.newPassword}
                setValue={setPayload}
                name='newPassword'
                password='password'
            />
           
            <Button text='Cập nhật' bgColor='bg-secondary1' textColor='text-white' 
                onClick={handleSubmit}
            />
        </div>
        <div className='w-full flex justify-center'>
            <ContactBot />
          </div>
    </div>
  )
}

export default ChangePassword