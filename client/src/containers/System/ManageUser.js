import React, { useEffect, useState } from "react";
import { apiGetUsers, apiDeleteUsers, apiUpdateUsers } from "../../services";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Pagination } from "../Public";
import { useSearchParams } from "react-router-dom";

const ManageUser = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState();
  const [isShowModal, setIsShowModal] = useState(false);
  const [selected, setSelected] = useState({ id: null, name: null });
  const [isEdit, setIsEdit] = useState(false);
  const [userFilter, setUserFilter] = useState(null);
  const [payload, setPayload] = useState({
    name: "",
    positionCode: "",
    id: "",
  });
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  const [filter, setFilter] = useState({
    id: "",
    name: "",
    phone: "",
    status: 0,
  });
  const fetchUsers = async (query) => {
    const response = await apiGetUsers(query);
    if (response.data.err === 0) {
      const userCheck = response.data.response.rows.filter(
        (item) => item.roleData.code !== "R1"
      );
      // console.log(userCheck)
      setUsers(userCheck);
    }
  };
  useEffect(() => {
    if (userData && userData?.roleCode === "R1") {
      if (!isEdit || !isShowModal) fetchUsers();
    }
  }, [isShowModal, isEdit, userData]);
  useEffect(() => {
    setUserFilter(users);
  }, [users]);
  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] };
      }
    });
    fetchUsers({ ...searchParamsObject, limit: 7 });
    console.log(searchParamsObject);
  }, [searchParams]);
  // console.log(users)
  const handleDeleteUser = async () => {
    const response = await apiDeleteUsers(selected.id);
    if (response.data.err === 0) {
      toast.success(response.data.msg);
      setIsShowModal(false);
      setSelected({ id: null, name: null });
    }
  };
  const handleEdit = (item) => {
    setIsEdit(item.id);
    setPayload({
      name: item.name,
      positionCode: item.positionData.code,
      id: item.id,
    });
  };
  const handleComfirmEdit = async () => {
    const response = await apiUpdateUsers(payload);
    if (response.data.err === 0) {
      setIsEdit(false);
    }
  };
  const handleFilterByStatus = ({ id, name, phone, status }) => {
    // console.log(id, name, phone, status)
    setUserFilter(
      users.filter((item) => {
        // console.log(item.id?.match(/\d/g)?.slice(0, 6).toString().split(',').join(''))
        // item.id?.match(/\d/g)?.slice(0, 6).toString().split(',').join('').includes(id)
        return (
          (name.trim() !== "" ? item?.name.includes(name.trim()) : true) &&
          (id !== ""
            ? item.id
                ?.match(/\d/g)
                ?.slice(0, 6)
                .toString()
                .split(",")
                .join("")
                .includes(id)
            : true) &&
          (phone !== "" ? item?.phone.includes(phone) : true) &&
          (status === 0
            ? true
            : status === 1
            ? item?.positionData?.code === "P1"
            : item?.positionData?.code === "P2")
        );
      })
    );
    setFilter({
      id: "",
      name: "",
      phone: "",
      status: 0,
    });
  };
  // console.log(userFilter);
  // console.log(users)
  return (
    <>
      {userData && userData?.roleCode === "R1" ? (
        <div className="relative flex flex-col min-h-screen">
          {isShowModal && (
            <div
              onClick={() => setIsShowModal(false)}
              className="absolute top-[50px] left-0 right-0 bottom-0 flex justify-center bg-overlay-70"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[500px] h-fit bg-white"
              >
                <h3 className="p-4 font-bold text-white bg-orange-500">
                  Thao tác không thể hoàn tác
                </h3>
                <div className="flex flex-col gap-8 p-4">
                  <span>{`Bạn có chắc muốn xóa thành viên ${selected.name} ?`}</span>
                  <span className="flex justify-end w-full gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsShowModal(false);
                      }}
                      className="px-4 py-2 text-white bg-blue-700 rounded-md"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser();
                      }}
                      className="px-4 py-2 text-white bg-red-700 rounded-md"
                    >
                      Xóa
                    </button>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-3xl font-medium ">Quản lý thành viên</h1>
            <div className="flex gap-2 text-sm">
              <div>
                <label htmlFor="filter-id" className="">
                  Lọc theo User ID:{" "}
                </label>
                <input
                  id="filter-id"
                  value={filter.id}
                  type="text"
                  className="px-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Lọc theo id thành viên"
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, id: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="filter-author" className="">
                  Lọc theo tên:{" "}
                </label>
                <input
                  id="filter-author"
                  value={filter.name}
                  type="text"
                  className="px-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Lọc theo tên thành viên"
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="filter-author" className="">
                  Lọc theo số điện thoại:{" "}
                </label>
                <input
                  id="filter-author"
                  value={filter.phone}
                  type="text"
                  className="px-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Lọc theo số điện thoại"
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              <select
                value={filter.status}
                name=""
                id=""
                className="px-1 border border-gray-400 rounded-md outline-none"
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, status: +e.target.value }))
                }
              >
                <option value="0">Lọc theo trạng thái thành viên</option>
                <option value="1">Được quyền đăng bài</option>
                <option value="2">Khóa quyền đăng bài</option>
              </select>
              <button
                type="button"
                className="px-4 text-white border rounded-md outline-none bg-secondary2"
                onClick={() => {
                  // console.log(filter)
                  handleFilterByStatus(filter);
                }}
              >
                Lọc
              </button>
            </div>
          </div>
          <table className="mx-8 table-fixed">
            <thead>
              <tr className="bg-blue-500">
                <th className="p-4 border">STT</th>
                <th className="p-4 border">User ID</th>
                <th className="p-4 border">Tên</th>
                <th className="p-4 border">Số điện thoại</th>
                <th className="p-4 border">Số bài đăng</th>
                <th className="p-4 border">Trạng thái</th>
                <th className="p-4 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {userFilter?.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-4 border">{index + 1}</td>
                  <td className="p-4 border">
                    <span>#</span>
                    <span>{item.id?.match(/\d/g)?.slice(0, 6)}</span>
                  </td>
                  <td className="p-4 border">
                    {isEdit === item.id ? (
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-200 rounded-md"
                        value={payload.name || item.name}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </td>
                  <td className="p-4 border">{item.phone}</td>
                  <td className="p-4 border">{item.users.length}</td>
                  <td className="p-4 border">
                    {isEdit === item.id ? (
                      <select
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            positionCode: e.target.value,
                          }))
                        }
                        className="w-full p-2 bg-gray-200 rounded-md"
                        value={payload.positionCode}
                      >
                        <option value="P1">Được quyền đăng bài</option>
                        <option value="P2">Khóa quyền đăng bài</option>
                      </select>
                    ) : (
                      <span>{item.positionData.value}</span>
                    )}
                  </td>
                  <td className="p-4 border">
                    {isEdit === item.id ? (
                      <button
                        type="button"
                        className="px-4 text-blue-500 hover:underline hover:text-orange-600"
                        onClick={handleComfirmEdit}
                      >
                        Xác nhận
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-4 text-blue-500 hover:underline hover:text-orange-600"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                    )}
                    <button
                      type="button"
                      className="px-4 text-blue-500 hover:underline hover:text-orange-600"
                      onClick={() => {
                        setIsShowModal(true);
                        setSelected({ id: [item.id], name: item.name });
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination isAdmin={true} />
        </div>
      ) : (
        <span className="m-10 text-2xl italic font-bold text-red-600">
          Chức năng chỉ dành riêng cho Admin Website !
        </span>
      )}
    </>
  );
};

export default ManageUser;
