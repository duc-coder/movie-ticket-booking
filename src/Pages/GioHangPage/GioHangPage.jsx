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
        <img
          className='w-full
          md:h-52
          lg:h-80'
          src={Banner} />
      </div>
      <div className='my-5
      w-full md:grid md:grid-cols-12
      lg:w-10/12 lg:mx-auto lg:grid lg:grid-cols-12'>
        <div className='
        md:col-span-3
        lg:col-span-3'>
          <div className='w-11/12 p-5 mx-auto bg-white border border-gray-300 rounded-2xl'>
            <div className='w-full'>
              <img
                src={
                  thongTinNguoiDungURL.avatar //Kiểm tra tài khoản có sẵn avatar
                    ? thongTinNguoiDungURL.avatar
                    : imgUrl //Hiển thị ảnh upload mới thay cho ảnh cũ
                      ? imgUrl
                      : userPic
                }
                alt="avatar"
                className='mx-auto rounded-full
                w-28
                md:w-28 
                lg:w-36'
              />
              {
                unAuthorization
                  ? <Fragment />
                  : <form onSubmit={formik.handleSubmit} className='w-full flex flex-wrap justify-center relative
                  h-14
                  md:h-14
                  lg:h-16'>
                    <label
                      for="upload-photo"
                      className='w-full h-5 cursor-pointer text-center underline font-bold
                      text-xs
                      lg:text-base'
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
                          className='bg-rose-500 text-white font-bold rounded-lg py-1 px-2 text-sm absolute bottom-0
                          my-2'
                          onClick={formik.handleSubmit}
                        >
                          Upload
                        </button>
                        : <Fragment />
                    }
                  </form>
              }
            </div>

            <div className='border-t border-t-gray-300
            md:pt-2 text-center
            lg:mt-2 lg:pt-5 lg:text-left'>
              <p className='font-bold
              md:text-xs
              lg:text-xl'>
                {thongTinNguoiDungURL.hoTen} đã xác nhận
              </p>
              <span><FontAwesomeIcon icon={faCheck} /></span> <span>Địa chỉ email</span>
            </div>
          </div>
        </div>
        <div className='
        md:col-span-9
        lg:col-span-9'>
          <div className='w-full p-2'>
            <div className='w-full border-b border-b-gray-300
            pb-5 mb-5
            lg:mb-10 lg:pb-10'>
              <h1 className='font-bold my-auto
              text-xl text-center
              md:text-2xl md:text-left
              lg:text-4xl lg:text-left'>
                Xin chào, tôi là {thongTinNguoiDungURL.hoTen}
              </h1>
              <p className='text-base text-gray-500 my-auto
              text-center
              md:text-left lg:text-left'>
                Bắt đầu tham gia vào 2022
              </p>
              <p
                className='text-base underline cursor-pointer mt-2 my-auto font-bold hover:text-gray-500
                text-center
                md:text-left lg:text-left'
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
            {
              unAuthorization
                ? <Fragment />
                : <div className='w-full mb-10 pb-5 border-b border-b-gray-300'>
                  <p
                    className='text-base underline cursor-pointer font-bold my-auto hover:text-gray-500
                    text-center
                md:text-left lg:text-left'
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
                className='text-base underline cursor-pointer font-bold my-auto hover:text-gray-500
                text-center
                md:text-left lg:text-left'
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
