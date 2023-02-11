import React, {useEffect, useState} from 'react'
// import { textHomePage } from '../../ultils/constant'
import {Province, ItemSidebar,RelativePost } from '../../components'
import { List, Pagination } from './index'
import {useSelector} from 'react-redux'
import {useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'
// import * as actions from '../../store/actions'


const Rental = () => {
  const { prices, areas, categories } = useSelector(state => state.app)
  const location = useLocation()
  const [categoryCode, setCategoryCode] = useState('none')
  const [categoryCurrent, setCategoryCurrent] = useState([])
  useEffect(() => {
    const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
    setCategoryCurrent(category)
    if (category) {
      setCategoryCode(category.code)
    }

  },[location])

  // console.log(categoryCode);


  return (
    <div className="w-full flex flex-col gap-3 mt-3">
      <div> 
          <h1 className="font-bold text-2xl mb-2">
            {categoryCurrent?.header}
          </h1>
          <span className="text-base">
          {categoryCurrent?.subheader}
          </span>
      </div>
      <Province/>
      <div className="w-full flex gap-3">
          <div className="w-[70%]">
            <List categoryCode ={categoryCode}/>
            <Pagination />
          </div>
          <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
            <ItemSidebar content = {prices} type='priceCode' title = "Xem theo giá" isDouble />
            <ItemSidebar content = {areas} type='areaCode' title = "Xem theo diện tích" isDouble/>
            <RelativePost newPost/>
          </div>
      </div>
    </div>
  )
}

export default Rental