import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className="border w-full my-3 rounded-md">
        <div className="p-5 flex flex-col gap-3">
          <h1>Hướng dẫn đăng tin</h1>
          <span>
            Chào bạn, sau đây là hướng dẫn sử dụng cho thành viên website phongtro123.com.
          </span>
          <span>
            Nếu bạn chưa có tài khoản, hãy <Link to='/login' class='text-blue-600'>đăng ký tại đây</Link> trước khi bắt đầu đăng tin mới.
          </span>
          <span>
            Nếu đã có tài khoản, sau khi <Link to='/login' class='text-blue-600'>đăng nhập</Link> vào website, bạn bấm vào nút <Link to='/he-thong/quan-ly-bai-dang' class='text-blue-600'>ĐĂNG TIN MỚI</Link> để bắt đầu.
          </span>
          <span>
            Khi đăng tin các bạn đọc kỹ mô tả từng bước, nhập đầy đủ và chính xác nội dung cho tin đăng, đặc biệt là mục Giá và Diện tích. Những tin có nội dung hình ảnh rõ ràng, đầy đủ sẽ có tỉ lệ xem cao hơn 50%.
          </span>
          <span>
          Lưu ý khi đăng tin:
          </span>
          <span>
          + Điền đầy đủ các thông tin bắt buộc vào các ô nhập liệu trong phần đăng tin.
          </span>
          <span>
          + Phần giá cho thuê, vui lòng nhập chính xác 1 giá duy nhất (Không nhập giá từ ....đến ....) và chọn đúng đơn vị giá là triệu/tháng hoặc nghìn/tháng. Ví dụ bạn cho thuê 3 triệu/tháng thì bạn nhập đủ như sau 3000000 (1 số 3 và 6 số 0).
          </span>
          <span>
          + Diện tích nhập đúng 1 diện tích duy nhất (Không nhập diện tích từ ....đến ....)
          </span>
          <span>
          + Sau khi nhập đầy đủ các thông tin, bấm ĐĂNG TIN NGAY và chờ vài giây để tin bạn hiển thị trên website, nếu đăng tin thành công hệ thống sẽ báo bạn đã đăng tin thành công, nếu hệ thống cảnh báo màu đỏ, các ô chọn màu bị sai, vui lòng nhập lại cho chính xác và bấm ĐĂNG TIN NGAY lại.
          </span>
        </div>
    </div>
  )
}

export default Contact