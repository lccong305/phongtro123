import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, SideBar } from "./index";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="w-full h-screen flex flex-col items-center bg-[#f5f5f5]">
      <Header />
      <div className="flex flex-auto w-full overflow-hidden">
        <div className="w-[300px] flex-none ">
          <SideBar />
        </div>
        <div className="flex-auto h-full overflow-y-auto text-sm bg-white shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
