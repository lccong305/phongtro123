import React from "react";
import avatar from "../../assets/avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import menuSideBar from "../../ultils/menuSideBar";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import icons from "../../ultils/icons";

const { IoIosLogOut } = icons;
const activeStyle =
  "hover:bg-gray-300 border-b py-2 px-3 flex gap-2 items-center rounded-md font-bold";
const notActiveStyle =
  "hover:bg-gray-300 border-b py-2 px-3 flex gap-2 items-center rounded-md";

const SideBar = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full p-5 ">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            src={userData?.avatar || avatar}
            alt="avatar"
            className="object-cover w-12 h-12 rounded-full"
          />
          <div className="flex flex-col ">
            <span className="font-semibold">{userData?.name}</span>
            <span className="text-sm ">{userData?.phone}</span>
          </div>
        </div>
        <span>
          Mã tài khoản:{" "}
          <span className="font-semibold">{userData?.id?.slice(0, 8)}</span>...
        </span>
      </div>

      <div className="mt-5 ">
        {userData?.roleCode === "R1"
          ? menuSideBar.map((item) => {
              return (
                <NavLink
                  key={item.id}
                  to={item?.path}
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                >
                  {item?.icon}
                  {item.text}
                </NavLink>
              );
            })
          : menuSideBar
              .filter((item) => item.id !== 3 && item.id !== 4)
              .map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={item?.path}
                    className={({ isActive }) =>
                      isActive ? activeStyle : notActiveStyle
                    }
                  >
                    {item?.icon}
                    {item.text}
                  </NavLink>
                );
              })}
        <span
          className="flex items-center gap-2 px-3 py-2 italic border-b rounded-md hover:bg-gray-300"
          onClick={() => {
            dispatch(actions.logout());
          }}
        >
          <IoIosLogOut />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default SideBar;
