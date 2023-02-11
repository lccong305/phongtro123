import React, { useState, useEffect } from "react";
import { ViewPost } from "../../components";
import { Pagination } from "../Public";
import {
  apiDeletePostAdmin,
  apiGetPostsLimit,
  apiUpdatePostAdmin,
  apiGetPostAd,
} from "../../services/post";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AiOutlineEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { TbFileCheck } from "react-icons/tb";
import { CiNoWaitingSign } from "react-icons/ci";

const ManagePostAdmin = () => {
  const [searchParams] = useSearchParams();
  const [isShowModal, setIsShowModal] = useState(false);
  const [selected, setSelected] = useState({ id: null, title: null });
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [payload, setPayload] = useState({
    title: "",
    id: "",
    expire: "",
    oid: "",
    status: "",
    star: 0,
  });
  const { userData } = useSelector((state) => state.user);
  const [update, setUpdate] = useState(false);
  const [posts, setPosts] = useState(null);
  const [postView, setPostView] = useState({});
  const [postFilter, setPostFilter] = useState(null);
  const [filter, setFilter] = useState({
    statusC: 0,
    statusAc: 0,
    id: "",
    author: "",
  });
  const fetchPosts = async (queries) => {
    const response = await apiGetPostAd(queries);
    if (response.data.err === 0) {
      setPosts(response.data.response);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [update]);

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
    fetchPosts(searchParamsObject);
    console.log(searchParamsObject);
  }, [searchParams]);

  useEffect(() => {
    setPostFilter(posts);
  }, [posts]);

  const handleComfirmEdit = async () => {
    console.log(payload);
    const response = await apiUpdatePostAdmin(payload);
    if (response.data.err === 0) setUpdate((prev) => !prev);
    setIsEdit(false);
  };
  // console.log(posts)
  const handleDeletePost = async () => {
    const response = await apiDeletePostAdmin(selected.id);
    if (response.data.err === 0) {
      setUpdate((prev) => !prev);
      setIsShowModal(false);
    }
  };

  const formatDate = "DD/MM/YYYY";
  const checkStatus = (datetime) =>
    moment(datetime, formatDate).isSameOrAfter(new Date().toDateString());

  const handleFilterByStatus = ({ statusC, statusAc, id, author }) => {
    // console.log(statusC, statusAc,id, author)
    setPostFilter(
      posts.filter((item) => {
        // console.log(item.id?.match(/\d/g)?.slice(0, 6).toString().split(',').join(''))
        // item.id?.match(/\d/g)?.slice(0, 6).toString().split(',').join('').includes(id)
        return (
          (author.trim() !== ""
            ? item?.users.name.includes(author.trim())
            : true) &&
          (id !== ""
            ? item.id
                ?.match(/\d/g)
                ?.slice(0, 6)
                .toString()
                .split(",")
                .join("")
                .includes(id)
            : true) &&
          (statusC === 0
            ? true
            : statusC === 1
            ? item.status === "checked"
            : item.status === "unChecked") &&
          (statusAc === 0
            ? true
            : statusAc === 1
            ? checkStatus(
                item?.overviews?.expire?.split(" ")[3] ||
                  item?.overviews?.expire
              )
            : !checkStatus(
                item?.overviews?.expire?.split(" ")[3] ||
                  item?.overviews?.expire
              ))
        );
      })
    );
    setFilter({
      statusC: 0,
      statusAc: 0,
      id: "",
      author: "",
    });
    // if (statusC === 0 && statusAc === 0) {
    //         setPostFilter(posts)
    //     }
    //     else if (statusC === 0 && statusAc === 1) {
    //         const activePost = posts?.filter(item => checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
    //         setPostFilter(activePost)
    //     }
    //     else if (statusC === 0 && statusAc === 2) {
    //         const activePost = posts?.filter(item => !checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
    //         setPostFilter(activePost)
    //     }
    //     else if (statusC === 1 && statusAc === 0) {
    //         const activePost = posts?.filter(item => item.status ==='checked')
    //         setPostFilter(activePost)
    //     }
    //     else if (statusC === 1 && statusAc === 1) {
    //         const activePost = posts?.filter(item => item.status ==='checked' && checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
    //         setPostFilter(activePost)
    //     }
    //     else if (statusC === 1 && statusAc === 2) {
    //         const activePost = posts?.filter(item => item.status ==='checked' && !checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
    //         setPostFilter(activePost)
    //     }
    //     else if (statusC === 2 && statusAc === 0) {
    //         const activePost = posts?.filter(item => item.status ==='unChecked')
    //         setPostFilter(activePost)
    //     }
    //     else if (statusC === 2 && statusAc === 1) {
    //         const activePost = posts?.filter(item => item.status ==='unChecked' && checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
    //         setPostFilter(activePost)
    //     }
    //     else if (statusC === 2 && statusAc === 2) {
    //         const activePost = posts?.filter(item => item.status ==='unChecked' && !checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
    //         setPostFilter(activePost)
    //     }
    // console.log(postIdFilter, postAuthor)
  };
  // console.log(postFilter)
  return (
    <>
      {userData?.roleCode === "R1" ? (
        <div className="relative flex flex-col min-h-screen overflow-y-scroll">
          {isShowModal && (
            <div
              onClick={() => setIsShowModal(false)}
              className="absolute top-0 bottom-0 left-0 right-0 flex justify-center pt-20 bg-overlay-70"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[500px] h-fit bg-white"
              >
                <h3 className="p-4 font-bold text-white bg-orange-500">
                  Thao tác không thể hoàn tác
                </h3>
                <div className="flex flex-col gap-8 p-4">
                  <span>
                    Bạn có chắc muốn xóa bài đăng với tựa đề{" "}
                    <span className="font-bold">{selected.title}</span>
                    <span> không?</span>
                  </span>
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
                        handleDeletePost();
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
            <h1 className="text-3xl font-medium ">Quản lý bài đăng</h1>
            <div className="flex gap-2 text-sm">
              <div>
                <label htmlFor="filter-id" className="">
                  Lọc theo Post ID:{" "}
                </label>
                <input
                  id="filter-id"
                  value={filter.id}
                  type="text"
                  className="px-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Lọc theo id bài đăng"
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, id: +e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="filter-author" className="">
                  Lọc theo tác giả:{" "}
                </label>
                <input
                  id="filter-author"
                  value={filter.author}
                  type="text"
                  className="px-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Lọc theo tác giả bài đăng"
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, author: e.target.value }))
                  }
                />
              </div>
              <select
                value={filter.statusC}
                name=""
                id=""
                className="px-1 border border-gray-400 rounded-md outline-none"
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, statusC: +e.target.value }))
                }
              >
                <option value="0">Lọc theo trạng thái duyệt</option>
                <option value="1">Đã duyệt</option>
                <option value="2">Chờ duyệt</option>
              </select>
              <select
                value={filter.statusAc}
                name=""
                id=""
                className="px-1 border border-gray-400 rounded-md outline-none"
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, statusAc: +e.target.value }))
                }
              >
                <option value="0">Lọc theo trạng thái hoạt động</option>
                <option value="1">Đang hoạt động</option>
                <option value="2">Đã hết hạn</option>
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
          <table className="w-[95%] table-auto mx-8 border">
            <thead>
              <tr className="bg-blue-500">
                <th className="p-4 border">STT</th>
                <th className="p-4 border">Post ID</th>
                <th className="p-4 border">Tựa đề</th>
                <th className="p-4 border">Tác giả</th>
                <th className="p-4 border">Ngày đăng</th>
                <th className="p-4 border">Ngày kết thúc</th>
                <th className="p-4 text-center border">Trạng thái hoạt động</th>
                <th className="p-4 text-center border">Trạng thái duyệt</th>
                <th className="p-4 border">Đánh giá (số sao)</th>
                <th className="p-4 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {postFilter?.rows?.map((item, index) => (
                <tr key={item.id} className="border">
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
                        value={payload.title || item.title}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span className="item1line">{item.title}</span>
                    )}
                  </td>
                  <td className="p-4 border">
                    {item.users.name || "Tài khoản tác giả đã xóa"}
                  </td>
                  <td className="p-4 border">
                    {item.overviews.created.split(" ")[3]}
                  </td>
                  <td className="p-4 border">
                    {isEdit === item.id ? (
                      <input
                        type="date"
                        className="w-full p-2 bg-gray-200 rounded-md"
                        value={payload.expire}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            expire: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>
                        {item.overviews.expire.split(" ")[3] ||
                          item.overviews.expire}
                      </span>
                    )}
                    {/* <span>{item.overviews.expire.split(' ')[3] || item.overviews.expire }</span> */}
                  </td>
                  <td className="p-4 text-center border">
                    {checkStatus(
                      item?.overviews?.expire?.split(" ")[3] ||
                        item?.overviews?.expire
                    ) ? (
                      <AiOutlineEye size={24} />
                    ) : (
                      <AiTwotoneEyeInvisible size={24} />
                    )}
                  </td>
                  <td className="p-4 border">
                    {isEdit === item.id ? (
                      <select
                        type="date"
                        className="w-full p-2 bg-gray-200 rounded-md"
                        value={payload.status}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                      >
                        <option value="checked">Duyệt</option>
                        <option value="unChecked">Không duyệt</option>
                      </select>
                    ) : (
                      <span>
                        {item.status === "checked" ? (
                          <TbFileCheck size={24} />
                        ) : (
                          <CiNoWaitingSign size={24} />
                        )}
                      </span>
                    )}
                  </td>
                  <td className="p-4 border">
                    {isEdit === item.id ? (
                      <select
                        type="date"
                        className="w-full p-2 bg-gray-200 rounded-md"
                        value={payload.star}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            star: e.target.value,
                          }))
                        }
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    ) : (
                      <span>{item.star}</span>
                    )}
                  </td>
                  <td className="flex items-center justify-center p-4 ">
                    {isEdit === item.id ? (
                      <button
                        type="button"
                        className="px-4 text-blue-500 border-none hover:underline hover:text-orange-600"
                        onClick={handleComfirmEdit}
                      >
                        Xác nhận
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-4 text-blue-500 border-none hover:underline hover:text-orange-600"
                        onClick={() => {
                          setIsEdit(item.id);
                          setPayload({
                            id: item.id,
                            expire: item.overviews.expire.split(" ")[3],
                            title: item.title,
                            oid: item.overviews.id,
                            status: item.status,
                            star: item.star,
                          });
                        }}
                      >
                        Sửa
                      </button>
                    )}
                    <button
                      type="button"
                      className="px-4 text-blue-500 border-none hover:underline hover:text-orange-600"
                      onClick={() => {
                        setIsShowModal(true);
                        setSelected({ id: item.id, title: item.title });
                      }}
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="px-4 text-blue-500 hover:underline hover:text-orange-600"
                      onClick={() => {
                        // console.log(item)
                        setIsView(true);
                        setPostView(item);
                      }}
                    >
                      Xem
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
      {isView && <ViewPost setIsView={setIsView} post={postView} />}
    </>
  );
};

export default ManagePostAdmin;
