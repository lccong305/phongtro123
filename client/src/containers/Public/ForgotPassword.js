import React,{useState, useEffect} from 'react'
import {InputForm, Button} from '../../components'
import { apiGetUserByPhone, apiCreateNewPassword } from '../../services'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const ForgotPassword = () => {
  const navigate = useNavigate()
  const [invalidFields, setInvalidFields] = useState([])
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
  const [createNewPass, setCreateNewPass] = useState(false)
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
  })
  
  const handleSubmit = async () => {
    if (createNewPass) {
      console.log(payload)
      if (payload.password === '') {
        setError2(true)
      }
      else {
        setError2(false)
        console.log(payload)
        const response = await apiCreateNewPassword(payload)
        console.log(response)
        if (response.data.err === 0) {
          Swal.fire('Thành công','Đã tạo mới được mật khẩu vui lòng nhớ kỹ !','success').then(() => { 
            navigate('/login')
           })
        }
        else {
          Swal.fire('Thất bại','Lấy lại mật khẩu thất bại !','error')
        }
      }
      
    }
    else {
      if (payload.phone === '') {
        setError1(true)
      }
      else {
        setError1(false)
        // console.log(payload)
        const response = await apiGetUserByPhone(payload)
        if (response.data.err === 0) {
          Swal.fire('Thành công','Vui lòng đăng lại mật khẩu mới !','success').then(() => { 
            setCreateNewPass(true)
           })
        }
        else {
          Swal.fire('Thất bại','Số điện thoại chưa được đăng ký tài khoản !','error')
        }
      }

    }
  }
  return (
    <div className>
      <h1 className='font-semibold text-3xl py-5 text-center' >Quên mật khẩu</h1>
      <div className="py-5 px-10 border flex flex-col gap-4">
        <span className='italic'>Vui lòng nhập số điện thoại mà bạn đã dùng để đăng ký tài khoản !</span>
        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Số điện thoại'} value={payload.phone} setValue={setPayload} keyPayload='phone'/>
        {error1 && <small className="italic text-red-500">Vui lòng điền vào trường này !</small>}
        {createNewPass && 
          <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} 
          label={'Mật khẩu mới'} value={payload.password} setValue={setPayload} keyPayload='password' type='password'
          />
        }
        {error2 && <small className="italic text-red-500">Vui lòng điền vào trường này !</small>}
        <Button 
          text={`${createNewPass ? 'Lưu' : 'Tiếp tục'}`}
          textColor='text-white'
          bgColor='bg-secondary1'
          fullWidth
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

export default ForgotPassword