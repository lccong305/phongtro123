import React, {useCallback, useState} from 'react'
import logo from '../../assets/logo.PNG'
import {Button, User} from '../../components'
import icons from '../../ultils/icons'
import {useNavigate, Link } from 'react-router-dom'
import {path} from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import menuManage from '../../ultils/menuManage'


const {AiOutlinePlusCircle, GrLogout, IoIosLogOut, BiChevronDown, BsChevronDoubleDown} = icons


const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN,{state: {flag} })
  },[])

  const { isLoggedIn } = useSelector(state => state.auth)
  const {userData} = useSelector(state => state.user)


  return (
    <div className="w-3/5">

    <div className="w-full flex items-center justify-between">
      <Link to='/'>
        <img 
          src={logo}
          alt = "logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>
      <div className='flex items-center gap-1'>
        {!isLoggedIn && 
          <div className='flex items-center gap-1'>
            <small className="">Phòng trọ 123 xin chào !</small>
            <Button 
              text={'Đăng nhập'} textColor='text-white' bgColor='bg-[#3961fb]' 
              onClick={()=> {goLogin(false)}}
            />
            <Button 
              text={'Đăng Ký'} textColor='text-white' bgColor='bg-[#3961fb]' 
              onClick={()=> {goLogin(true)}}
            />
          </div> 
        }
        {isLoggedIn && 
          <div className='flex items-center gap-1 relative'>
            <User />
            <Button 
              text={'Quản lý tài khoản'} textColor='text-white' bgColor='bg-[#3961fb]' 
              onClick = {() => setIsShowMenu(prev => !prev)}
              IcAfter = {BsChevronDoubleDown}
            />
            {isShowMenu && 
              <div className='absolute border min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col gap-2 z-50'>
                { userData?.roleCode === 'R1' ? 
                  menuManage.map(item => {
                    return (
                      <Link key={item.id} to = {item?.path}
                        className="hover:text-orange-500 border-b p-1 text-blue-700 flex gap-2 items-center "
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    )
                }) : 
                  menuManage.filter(item => item.id !== 3 && item.id !== 4).map(item => {
                    return (
                      <Link key={item.id} to = {item?.path}
                        className="hover:text-orange-500 border-b p-1 text-blue-700 flex gap-2 items-center "
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    )
                  })
                
                }
                <span className="hover:text-orange-500 border-b p-1 italic text-blue-700 cursor-pointer flex gap-2 items-center" 
                  onClick={() => {
                    dispatch(actions.logout())
                    setIsShowMenu(false);
                  }} >
                  <IoIosLogOut color = '#f73859'/>
                  Đăng xuất
                  
                </span>
              </div>
            }

            
          </div> 
        }
        
        <Link to='/he-thong/tao-moi-bai-dang'>
          <Button 
            text={'Đăng tin mới'} textColor='text-white' bgColor='bg-[#f73859]' IcAfter={AiOutlinePlusCircle}
            
            
          />
        </Link>
        
      </div>

    </div>
    </div>
  )
}

export default Header