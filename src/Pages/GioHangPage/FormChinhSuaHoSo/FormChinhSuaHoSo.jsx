import React, { Fragment } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import styles from '../css/FormChinhSuaHoSo.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { anFormChinhSuaHoSo, capNhatThongTinNguoiDungAsync } from '../../../reduxToolkit/nguoiDungSlice';

const dateFormat = 'DD/MM/YYYY';

export default function FormChinhSuaHoSo(props) {

    let { thongTinNguoiDungURL, unAuthorization } = props;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDungURL.taiKhoan,
            email: thongTinNguoiDungURL.email,
            hoTen: thongTinNguoiDungURL.hoTen,
            soDT: thongTinNguoiDungURL.soDT,
            matKhau: thongTinNguoiDungURL.matKhau,
            maNhom: 'GP01',
            maLoaiNguoiDung: thongTinNguoiDungURL.maLoaiNguoiDung,
        },
        onSubmit: values => {
            dispatch(capNhatThongTinNguoiDungAsync(values));
        },
    });

    let dispatch = useDispatch();

    const handleAnFormChinhSuaHoSo = () => {
        dispatch(anFormChinhSuaHoSo());
        window.scrollTo(0, 0);
    };

    //Enable button Lưu khi có thông tin được thay đổi
    let buttonDisable = true;
    let cssButtonDisable = 'cursor-not-allowed';
    if (
        thongTinNguoiDungURL.taiKhoan !== formik.values.taiKhoan ||
        thongTinNguoiDungURL.email !== formik.values.email ||
        thongTinNguoiDungURL.hoTen !== formik.values.hoTen ||
        thongTinNguoiDungURL.soDT !== formik.values.soDT ||
        thongTinNguoiDungURL.matKhau !== formik.values.matKhau
    ) {
        buttonDisable = false;
        cssButtonDisable = '';
    };

    return (
        <div className='main-div'>
            <Form
                onSubmitCapture={formik.handleSubmit}
                autoComplete="off"
                layout='vertical'
                className='w-full'
            >
                <Form.Item
                    label='Họ tên'
                >
                    <Input
                        disabled={unAuthorization}
                        name='hoTen'
                        onChange={formik.handleChange}
                        value={formik.values.hoTen} />
                </Form.Item>
                <Form.Item
                    label='Email'
                >
                    <Input
                        disabled={unAuthorization}
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email} />
                </Form.Item>
                <Form.Item
                    label='Số điện thoại'
                >
                    <Input
                        disabled={unAuthorization}
                        name='soDT'
                        onChange={formik.handleChange}
                        value={formik.values.soDT} />
                </Form.Item>
                <Form.Item
                    label='Mật khẩu'
                >
                    <Input
                        disabled={unAuthorization}
                        name='matKhau'
                        onChange={formik.handleChange}
                        value={formik.values.matKhau} />
                </Form.Item>
                <Form.Item
                    label='Tài khoản'
                >
                    <span className='text-red-500 italic'>
                        * Không thể thay đổi tên tài khoản
                    </span>
                    <Input
                        disabled
                        name='taiKhoan'
                        onChange={formik.handleChange}
                        value={formik.values.taiKhoan} />
                </Form.Item>
                <Form.Item>
                    <div className='flex justify-between'>
                        <p
                            className='text-base underline cursor-pointer py-2 px-4 hover:bg-gray-200'
                            onClick={() => { handleAnFormChinhSuaHoSo() }}
                        >
                            Ẩn
                        </p>
                        {
                            unAuthorization
                                ? <Fragment />
                                : <button
                                    disabled={buttonDisable}
                                    type='submit'
                                    className={`${cssButtonDisable} text-base font-bold py-2 px-4 text-white bg-gray-400 rounded-lg`}
                                    onClick={formik.handleSubmit}
                                >
                                    Lưu
                                </button>
                        }
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
