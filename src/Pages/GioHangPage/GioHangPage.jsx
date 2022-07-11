import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import userPic from '../../assets/img/user_pic.png';
import Banner from '../../assets/img/banner_datVePage.jpg';
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormChinhSuaHoSo from './FormChinhSuaHoSo/FormChinhSuaHoSo';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { danhSachNguoiDungAsync, hienThiFormChinhSuaHoSo, layThongTinNguoiDungAsync, selectDanhSachNguoiDung, selectFormChinhSuaHoSoOpen, selectThongTinNguoiDung, timKiemNguoiDungAsync } from '../../reduxToolkit/nguoiDungSlice';
import { uploadAvatar } from '../../reduxToolkit/authSlice';
import MyTicketBox from './MyTicketBox/MyTicketBox';
import _ from 'lodash';

export default function GioHangPage(props) {

  let dispatch = useDispatch();

  //Lấy mã taiKhoan từ URL
  let { taiKhoan } = useParams();

  useEffect(() => {
    dispatch(layThongTinNguoiDungAsync()); //Lấy thông tin người dùng đang đăng nhập
    dispatch(danhSachNguoiDungAsync(taiKhoan)) //Lấy thông tin người dùng theo URL
  }, [taiKhoan]);

  let thongTinNguoiDungURL = useSelector(selectDanhSachNguoiDung);
  let thongTinNguoiDungDangNhap = useSelector(selectThongTinNguoiDung);
  let formChinhSuaHoSoOpen = useSelector(selectFormChinhSuaHoSoOpen);
 
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  //Điều khiển hiển thị form thông tin cá nhân người dùng
  const handleHienThiChinhSuaThongTin = () => {
    dispatch(hienThiFormChinhSuaHoSo());
    window.scrollTo(0, 300);
  };

  //Form lấy thông tin avatar mới
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: null,
    },
    onSubmit: values => {
      //Tạo đối tượng đọc file
      let reader = new FileReader();
      reader.readAsDataURL(values.avatar);
      reader.onload = (e) => {
        let image = e.target.result;
        dispatch(uploadAvatar(image)); //Truyền thông tin ảnh avatar mới lên redux action authSlice
      };

      setTimeout(() => {
        //Ẩn nút xác nhận upload ảnh
        setLoading(false);
      }, 500);
    },
  });

  const handleUploadAvatar = (e) => {
    //Lấy file từ event
    let file = e.target.files[0];
    formik.setFieldValue('avatar', file);

    //Tạo đối tượng đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      let image = e.target.result;
      setImgUrl(image);
    }
    //Hiển thị nút xác nhận upload ảnh
    setLoading(true);
  };

  //Xác nhận quyền chỉnh sửa thông tin tài khoản
  let unAuthorization = true;
  let taiKhoanLocalStorage = thongTinNguoiDungDangNhap.taiKhoan;
  let taiKhoanURL = thongTinNguoiDungURL.taiKhoan;
  if (taiKhoanLocalStorage === taiKhoanURL) {
    unAuthorization = false;
  };

  return (
    <Fragment>
      <div className='w-full overflow-hidden'>
        <img className='w-full h-80' src={Banner} />
      </div>
      <div className='w-10/12 mx-auto my-5 grid grid-cols-12'>
        <div className='col-span-3'>
          <div className='w-11/12 p-5 mx-auto bg-white border border-gray-300 rounded-2xl'>
            <div className='w-11/12 mx-auto'>
              <img
                src={
                  thongTinNguoiDungURL.avatar //Kiểm tra tài khoản có sẵn avatar
                    ? thongTinNguoiDungURL.avatar
                    : imgUrl //Hiển thị ảnh upload mới thay cho ảnh cũ
                      ? imgUrl
                      : userPic
                }
                alt="avatar"
                className='w-36 h-36 mx-auto rounded-full'
              />
              {
                unAuthorization
                  ? <Fragment />
                  : <form onSubmit={formik.handleSubmit} className='w-full h-14 flex flex-wrap justify-center my-2 relative'>
                    <label
                      for="upload-photo"
                      className='w-full h-5 cursor-pointer text-center underline font-bold'
                    >
                      Cập nhật ảnh đại diện
                    </label>
                    <input
                      type='file'
                      id="upload-photo"
                      className='hidden -z-10 cursor-none'
                      onChange={handleUploadAvatar}
                    />
                    {
                      loading
                        ? <button
                          type='submit'
                          className='bg-rose-500 text-white font-bold rounded-lg py-1 px-2 text-sm absolute bottom-0'
                          onClick={formik.handleSubmit}
                        >
                          Upload
                        </button>
                        : <Fragment />
                    }
                  </form>
              }
            </div>

            <div className='mt-5 pt-5 border-t border-t-gray-300'>
              <p className='text-xl font-bold'>{thongTinNguoiDungURL.hoTen} đã xác nhận</p>
              <span><FontAwesomeIcon icon={faCheck} /></span> <span>Địa chỉ email</span>
            </div>
          </div>
        </div>
        <div className='col-span-9'>
          <div className='w-full p-2'>
            <div className='w-full mb-10'>
              <h1 className='text-4xl font-bold my-auto'>Xin chào, tôi là {thongTinNguoiDungURL.hoTen}</h1>
              <p className='text-base text-gray-500 my-auto'>Bắt đầu tham gia vào 2022</p>
              <p
                className='text-base underline cursor-pointer mt-2 my-auto font-bold hover:text-gray-500'
                onClick={() => { handleHienThiChinhSuaThongTin() }}
              >
                Xem hồ sơ thông tin cá nhân
              </p>
              {formChinhSuaHoSoOpen
                ? <FormChinhSuaHoSo
                  thongTinNguoiDungURL={thongTinNguoiDungURL}
                  unAuthorization={unAuthorization}
                />
                : <Fragment />
              }
            </div>
            <div className='w-full mb-10 pb-5 border-b border-b-gray-300'>
              <FontAwesomeIcon icon={faStar} className='mb-1' /> <span className='text-2xl font-bold my-auto'>0 đánh giá</span>
            </div>
            {
              unAuthorization
                ? <Fragment />
                : <div className='w-full mb-10 pb-5 border-b border-b-gray-300'>
                  <p
                    className='text-base underline cursor-pointer font-bold my-auto hover:text-gray-500'
                  >
                    Vé đã đặt của bạn
                  </p>
                  <div className='mt-2 w-full'>
                    <MyTicketBox
                      thongTinNguoiDungDangNhap={thongTinNguoiDungDangNhap}
                    />
                  </div>
                </div>
            }
            <div className='w-full mb-10 pb-5 border-b border-b-gray-300'>
              <p
                className='text-base underline cursor-pointer font-bold my-auto hover:text-gray-500'
              >
                Đánh giá của {thongTinNguoiDungURL.hoTen}
              </p>
            </div>
          </div >
        </div >
      </div >
    </Fragment>
  )
}
