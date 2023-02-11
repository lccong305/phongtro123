import React, {useState, useEffect} from 'react'
import {InputForm, Button} from '../../components'
import {useLocation, useNavigate} from 'react-router-dom'
// import { apiRegister } from '../../services/auth'
import * as actions from '../../store/actions'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


const Login = () => {
  
  const location = useLocation();
  const [isRegister, setisRegister] = useState(location.state?.flag)
  const [invalidFields, setInvalidFields] = useState([])
  // console.log(location);
  const dispatch = useDispatch();
  
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
    name: '',
  })
  
  useEffect( () => {
    setisRegister(location.state?.flag)
  },[location.state?.flag])
  
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector(state => state.auth)
  useEffect(()=>{
    isLoggedIn && navigate('/')
  },[isLoggedIn])
  
  useEffect( () => {
    msg && Swal.fire('Oops !',msg, 'error')
  },[msg,update])
  
  const handleSubmit = async() => {
    // console.log(payload);
    let finalPayload = isRegister ? payload : {
      phone: payload.phone,
      password: payload.password
    }
    let invalids =  validate(finalPayload);

    // console.log(invalids);
    if (invalids === 0) {
      isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
      
    }
    //  console.log(invalidFields);
    
  }
  
  const validate = (payload) => {
    // console.log(payload);
    let invalids = 0;
    let fields = Object.entries(payload)
    // console.log(fields);
    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          massage: 'Vui lòng điền đầy đủ thông tin !'
        }])
        invalids++;
      }
    })

    fields.forEach(item => {
      switch (item[0]) {
        case 'password':
          if (item[1].length < 6) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Mật khẩu phái có tối thiểu 6 kí tự !'
            }])
            invalids++;
          }
          break;
        case 'phone':
          if (!+item[1]) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Số điện thoại phải là các số !'
            }])
            invalids++;
          }
          if (+item[1].length !== 10) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Số điện thoại phải có đủ 10 số !'
            }])
            invalids++;
          }
          if (item[1].charAt(0) !== '0') {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Số điện thoại phải bắt đầu bằng số 0 !'
            }])
            invalids++;
          }
          break;
        default:
          break;
      }
    })
    return invalids;
  }


  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm flex flex-col gap-1">
      <span className="font-semibold text-2xl mb-2">{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</span>
      <div className="w-full flex flex-col gap-5">
        {isRegister &&  <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Họ tên'} value={payload.name} setValue={setPayload}  keyPayload='name' />}
        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Số điện thoại'} value={payload.phone} setValue={setPayload} keyPayload='phone' />
        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Mật khẩu'} value={payload.password} setValue={setPayload} type='password' keyPayload='password' />
        <Button 
          text={isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}
          textColor='text-white'
          bgColor='bg-secondary1'
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="w-full flex items-center justify-between mt-1.5">
      {isRegister ?
      <span className=" text-sm ">
        Bạn đã có tài khoản? 
        <span 
          onClick={()=>{ 
            setisRegister(false)
            setPayload({
                phone: '',
                password: '',
                name: '',
            }) }} 
            className="text-[blue] hover:text-[red] cursor-pointer">Đăng nhập ngay
        </span>
      </span>
      : 
      <>
      <Link to='/quen-mat-khau' className="text-[blue] text-sm hover:text-[red] cursor-pointer">Quên mật khẩu ?</Link>
      <span 
        onClick={() => {
          setisRegister(true)
          setPayload({
            phone: '',
            password: '',
            name: '',
          })
        }} 
        className="text-[blue] text-sm hover:text-[red] cursor-pointer">Tạo tài khoản mới
      </span>
      </>
      }
        
      </div>
    </div>
  )
}

export default Login