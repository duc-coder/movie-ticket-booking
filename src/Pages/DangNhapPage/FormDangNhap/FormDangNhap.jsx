import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Input } from 'antd';
import * as Yup from 'yup';
import styles from '../css/FormDangNhap.css';
import { useDispatch } from 'react-redux';
import { dangNhapAsync } from '../../../reduxToolkit/authSlice';

export default function FormDangNhap() {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  //Lấy thông tin đăng nhập từ form
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Vui lòng nhập email'),
      matKhau: Yup.string().required('Vui lòng nhập mật khẩu'),
    }),
    onSubmit: (values) => {
      //Gọi API gửi dữ liệu về backend
      dispatch(dangNhapAsync(values));
      setTimeout(() => {
        navigate('/');
      }, 500);
    },
  })

  return (
    <div className='form-dang-nhap-main-div
    w-full h-full flex items-center pt-20 pb-32
    md:pb-96 md:pt-28
    lg:pb-0 lg:h-screen lg:pt-0'>
      <div className='border border-gray-300 rounded-lg shadow-xl
      mx-auto w-full p-1
      md:w-9/12 md:p-2
      lg:w-5/12 lg:my-5 lg:p-2'>
        <h1 className='text-center text-3xl font-bold text-rose-500 mb-5'>Chào mừng bạn đến với MovieStar.vn</h1>

        <Form
          onSubmit={formik.handleSubmit}
        >
          <div className='w-full'>
            <div className='rounded-xl bg-white border-2 border-gray-300 relative mx-auto w-10/12 h-16 p-2'>
              <h3 className='pointer-events-none absolute z-10 text-gray-600'>
                Tài khoản
              </h3>
              <input
                placeholder='Nhập tên tài khoản'
                name='taiKhoan'
                onChange={formik.handleChange}
                value={formik.values.taiKhoan}
                className='w-full h-full pt-5 focus:outline-none'
              />
            </div>

            <div className='input-item w-10/12 h-16 mx-auto mt-2 p-2 rounded-xl bg-white border-2 border-gray-300 relative'>
              <h3 className='pointer-events-none absolute z-10 text-gray-600'>
                Mật khẩu
              </h3>
              <Input.Password
                placeholder='Nhập mật khẩu'
                name='matKhau'
                onChange={formik.handleChange}
                value={formik.values.matKhau}
              />
            </div>
          </div>

          <div className='w-full flex justify-center mt-2'>
            <button
              className='w-10/12 py-3 rounded-lg bg-rose-500 text-white text-base font-bold active:scale-95'
              type='submit'
              onClick={formik.submitForm}
            >
              Đăng nhập
            </button>
          </div>
        </Form>
        <div className='w-full mt-5 italic'>
          <span className='w-full
          flex flex-wrap justify-center
          md:justify-end
          lg:justify-end'>
            <p className='w-full text-center
            md:text-right
            lg:text-right'>
              Bạn chưa có tài khoản MovieStar?
            </p>
            <Link
              to={'/dangky'}
              className='text-rose-400 hover:text-rose-600 hover:underline
              w-full ml-1 text-center
              md:w-fit
              lg:w-fit'
            >
              Đăng ký thành viên ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
