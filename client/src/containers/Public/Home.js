import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigation, Search } from './index'
import { Intro, ContactBot } from '../../components'
import { useSelector } from 'react-redux'
import { path } from '../../ultils/constant'


const Home = () => {

  const { isLoggedIn } = useSelector(state => state.auth)
  const location = useLocation()




  return (
    <div className="w-full flex flex-col items-center bg-[#f5f5f5]" >
      <Header>

      </Header>
      <Navigation>

      </Navigation>
      {location.pathname !== `/${path.FORGOT_PASSWORD}` && location.pathname !== `/${path.HUONG_DAN_SU_DUNG}` && location.pathname !== `/${path.POST_LIKE}` && !location.pathname?.includes(path.DETAIL) && <Search />}
      <div className="w-3/5 flex flex-col items-start justify-start">
        <Outlet />
      </div>
      <Intro />
      <ContactBot contactButton />
    </div>
  )
}

export default Home