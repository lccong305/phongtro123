import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import { Home, Login, Rental, Contact, HomePage, DetailPost, SearchDetail, LikeList, ForgotPassword } from './containers/Public';
import { path } from './ultils/constant'
import {System, CreatePost, ManagePost, EditAccount, ChangePassword,  ManageUser, ManagePostAdmin} from './containers/System'
import { useDispatch, useSelector} from 'react-redux'
import * as actions from './store/actions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())

  }, [])

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 1000)
  }, [isLoggedIn])

  return (
    <div className="w-screen bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element = {<Home />}>
          <Route path={path.LOGIN} element = {<Login />} />
          <Route path='*' element = {<HomePage />} />
          <Route path={path.CHO_THUE_CAN_HO} element = {<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element = {<Rental />} />
          <Route path={path.CHO_THUE_NHA} element = {<Rental />} />
          <Route path={path.SEARCH} element = {<SearchDetail />} />
          <Route path={path.HUONG_DAN_SU_DUNG} element = {<Contact />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element = {<DetailPost />} />
          <Route path={path.POST_LIKE} element = {<LikeList />} />
          <Route path={path.FORGOT_PASSWORD} element = {<ForgotPassword />} />

        </Route>
        <Route path={path.SYSTEM} element = {<System />}>
          <Route path={path.CREATE_PORST} element = {<CreatePost />}></Route>
          <Route path={path.MANAGE_PORST} element = {<ManagePost />}></Route>
          <Route path={path.EDIT_ACCOUNT} element = {<EditAccount />}></Route>
          <Route path={path.CHANGE_PASSWORD} element = {<ChangePassword />}></Route>
          <Route path={path.CREATE_PORST} element={<CreatePost />}></Route>
          <Route path={path.MANAGE_USER_ADMIN} element={<ManageUser />}></Route>
          <Route path={path.MANAGE_POST_ADMIN} element={<ManagePostAdmin />}></Route>

        </Route>

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
