import React, { useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions'


const notActive = 'hover:bg-secondary2 h-full flex items-center py-2 px-4 '
const active = 'hover:bg-secondary2 h-full flex items-center bg-secondary2 py-2 px-4'

const Navigation = ({isAdmin}) => {

  // const [categories, setCategories] = useState([])
  const dispatch = useDispatch()
  const { categories } =  useSelector(state => state.app)
  // console.log(categories);
  useEffect(() => {
 
    dispatch(actions.getCategories())
  },[])

  const formatVietnameseToString = (keyword) => {
    return keyword
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("-")
  }

  return (
    <div className={`w-screen flex ${isAdmin ? 'justify-start flex-auto' : 'justify-center '} h-[40px] items-center bg-secondary1 text-white`}>
        <div className="w-3/5 flex h-full items-center text-sm font-medium ">
                <NavLink 
                    to={'/'}
                    className={({isActive}) => isActive ? active : notActive }
                >
                    Trang chủ

                </NavLink>
            {categories.length > 0 && categories.map((item) => {
              return (
                <div key={item.code} className="flex h-full justify-center items-center">
                  <NavLink 
                    to={`/${formatVietnameseToString(item.value)}`}
                    className={({isActive}) => isActive ? active : notActive }
                  >
                    {item.value}

                  </NavLink>
                </div>
              )
            })}
            <NavLink 
                    to={'/huong-dan-su-dung'}
                    className={({isActive}) => isActive ? active : notActive }
                >
                    Hướng dẫn

                </NavLink>
        </div>
    </div>
  )
}

export default Navigation