import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../css/FormDangKy.css';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const DangKyNguoiDungSchema = yup.object().shape({
  taiKhoan: yup.string().required('Vui lòng nhập đầy đủ thông này!'),
  matKhau: yup.string().required('Vui lòng nhập đầy đủ thông này!'),
  hoTen: yup.string().required('Vui lòng nhập đầy đủ thông này!'),
  email: yup.string().required('Vui lòng nhập đầy đủ thông này!').email('Email không hợp lệ!'),
  soDT: yup.string().required('Vui lòng nhập đầy đủ thông này!').matches(/^[0-9]+$/),
  maNhom: yup.string().required('Vui lòng nhập đầy đủ thông này!'),
});

export default function FormDangKy() {

  return (
    <div className='register-container
    w-full mx-auto pt-5 px-2 mb-2
    md:pt-20 md:w-9/12 md:mb-2 md:px-0
    lg:pt-28 lg:w-6/12 lg:mb-5 lg:px-0'>
      <h3 className='register-title'>
        Đăng ký tài khoản mới
      </h3>
      <Formik
        initialValues={{
          taiKhoan: '',
          matKhau: '',
          hoTen: '',
          soDT: '',
          maNhom: 'GP03',
          email: '',
        }}
        validationSchema={DangKyNguoiDungSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="taiKhoan"
              className='input-blank'
              name='taiKhoan'
              placeholder='Tên tài khoản'
            />
            <ErrorMessage name="taiKhoan" component="div">
              {msg => <span className='text-red-500'>{msg}</span>}
            </ErrorMessage>

            <Field
              type="matKhau"
              className='input-blank'
              name='matKhau'
              placeholder='Mật khẩu'
            />
            <ErrorMessage name="matKhau" component="div">
              {msg => <span className='text-red-500'>{msg}</span>}
            </ErrorMessage>

            <Field
              type="hoTen"
              className='input-blank'
              name='hoTen'
              placeholder='Họ Tên'
            />
            <ErrorMessage name="hoTen" component="div">
              {msg => <span className='text-red-500'>{msg}</span>}
            </ErrorMessage>

            <Field
              type="soDT"
              className='input-blank'
              name='soDT'
              placeholder='Số điện thoại'
            />
            <ErrorMessage name="soDT" component="div">
              {msg => <span className='text-red-500'>{msg}</span>}
            </ErrorMessage>

            <Field
              type="email"
              className='input-blank'
              name='email'
              placeholder='Email'
            />
            <ErrorMessage name="email" component="div">
              {msg => <span className='text-red-500'>{msg}</span>}
            </ErrorMessage>

            <Field
              component='select'
              className='input-blank'
              type="maNhom"
              name='maNhom'
              placeholder='Chọn nhóm'
            >
              <option>GP01</option>
              <option>GP02</option>
              <option>GP03</option>
              <option>GP04</option>
              <option>GP05</option>
              <option>GP06</option>
              <option>GP07</option>
              <option>GP08</option>
              <option>GP09</option>
            </Field>
            <ErrorMessage name="maNhom" component="select">
              {msg => <span className='text-red-500'>{msg}</span>}
            </ErrorMessage>

            <button
              className='register-confirm-btn'
              type="submit"
              disabled={isSubmitting}
            >
              Đăng ký
            </button>
          </Form>
        )}
      </Formik>
      <p className='login-text'>
        Bạn đã có tài khoản MovieStar?
        <Link
          className='login-link'
          to={'/dangnhap'}
        >
          <u>Đăng nhập</u>
        </Link>
      </p>
    </div>
  )
}
