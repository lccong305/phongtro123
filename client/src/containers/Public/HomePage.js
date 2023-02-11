import React from 'react'
import { textHomePage } from '../../ultils/constant'
import {Province, ItemSidebar,RelativePost } from '../../components'
import { List, Pagination } from './index'
import {useSelector} from 'react-redux'


const HomePage = () => {
  const {categories, prices, areas } = useSelector(state => state.app)

  
  
  // console.log(prices);
  return (
    <div className="w-full flex flex-col gap-3 mt-3">
      <div> 
          <h1 className="font-bold text-2xl mb-2">
            {textHomePage.HOME_TITLE}
          </h1>
          <span className="text-base">
            {textHomePage.HOME_DISCRIPTION}
          </span>
      </div>
      <Province/>
      <div className="w-full flex gap-3">
          <div className="w-[70%]">
            <List />
            <Pagination />
          </div>
          <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
            <ItemSidebar content = {categories} title="Danh sách cho thuê" />
            <ItemSidebar content = {prices} type='priceCode' title = "Xem theo giá" isDouble />
            <ItemSidebar content = {areas} type='areaCode' title = "Xem theo diện tích" isDouble/>
            <RelativePost newPost/>
          </div>
      </div>
    </div>
  )
}

export default HomePage