import { useFormik } from 'formik';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popover, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/SearchFilmBoxHomePage.css';
import heThongRapIcon from '../../../assets/img/cinema.png';
import cumRapIcon from '../../../assets/img/city.png';
import thoiGianChieuIcon from '../../../assets/img/date.png';
import { getDanhSachLichChieuPhimAsync, selectDanhSachLichChieuPhim } from '../../../reduxToolkit/rapSlice';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';


export default function SearchFilmBoxHomePage(props) {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Props truyền tư HomePage
    let { danhSachPhim, danhSachHeThongRap } = props;

    //Điều khiển mở/đóng popover Ant Design
    const [visible, setVisible] = useState(false);
    const hide = () => {
        setVisible(false);
    };
    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    //Tạo form lưu thông tin tìm kiếm
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: '',
            tenPhim: '',
            maHeThongRap: '',
            maCumRap: '',
            maLichChieu: '',
        },
        onSubmit: values => {
            navigate(`/dat-ve/${values.maLichChieu}`);
        },
    });

    //Danh sách hệ thống rạp, cụm rạp, lịch chiếu theo mã phim
    let danhSachLichChieuPhim = useSelector(selectDanhSachLichChieuPhim);
    let danhSachHeThongRapTheoPhim = [];
    if (danhSachLichChieuPhim.heThongRapChieu.length > 1) {
        danhSachHeThongRapTheoPhim = danhSachLichChieuPhim.heThongRapChieu;
    };

    //Render danh sách phim vào popover
    const renderDanhSachPhim = () => {
        if (danhSachPhim.length > 1) {
            return danhSachPhim.map((phim, index) => {
                return <p
                    className='my-2 py-1 cursor-pointer hover:bg-gray-300'
                    key={index}
                    onClick={() => {
                        hide();
                        formik.setFieldValue('maPhim', phim.maPhim)
                        formik.setFieldValue('tenPhim', phim.tenPhim)
                        dispatch(getDanhSachLichChieuPhimAsync(phim.maPhim));
                    }}
                >
                    {phim.tenPhim}
                </p>
            })
        }
    };

    //Import nội dung danh sách phim truyền vào popver tìm phim
    const FilmInputcontent = (
        <div className='h-52 overflow-y-scroll'>
            {renderDanhSachPhim()}
        </div>
    );

    //Render danh sách hệ thống rạp theo mã phim vào select
    const renderDanhSachHeThongRap = () => {
        return danhSachHeThongRapTheoPhim.map((Rap, index) => {
            return <option
                className='my-2 py-1 text-black'
                key={index}
                value={Rap.maHeThongRap}
            >
                {Rap.tenHeThongRap}
            </option>
        })
    };

    //Lấy danh sách cụm rạp theo mã hệ thống rạp đang chọn
    let danhSachCumRapTheoHeThongRap = [];
    if (formik.values.maHeThongRap.trim() !== '') {
        let indexCumRap = danhSachHeThongRapTheoPhim.findIndex(Rap => {
            return Rap.maHeThongRap === formik.values.maHeThongRap;
        });
        if (indexCumRap !== -1) {
            danhSachCumRapTheoHeThongRap = danhSachHeThongRapTheoPhim[indexCumRap].cumRapChieu;
        };
    };

    //Render danh sách cụm rạp theo mã hệ thống rạp đang chọn vào select
    const renderDanhSachCumRapTheoHeThongRap = () => {
        return danhSachCumRapTheoHeThongRap.map((cumRap, index) => {
            return <option
                className='my-2 py-1 text-black'
                key={index}
                value={cumRap.maCumRap}
            >
                {cumRap.tenCumRap}
            </option>
        })
    };

    //Lấy danh sách lịch chiếu phim theo mã cụm rạp đang chọn
    let danhSachSuatChieu = [];
    if (formik.values.maCumRap.trim() !== '') {
        let indexSuatChieu = danhSachCumRapTheoHeThongRap.findIndex(CumRap => {
            return CumRap.maCumRap === formik.values.maCumRap;
        });
        if (indexSuatChieu !== -1) {
            danhSachSuatChieu = danhSachCumRapTheoHeThongRap[indexSuatChieu].lichChieuPhim;
            console.log(danhSachSuatChieu);
        }
    };

    //Render danh sách suất chiếu phim theo mã cụm rạp đang chọn vào select
    const DateFormat = 'hh:mm - DD/MM/YYYY'
    const renderDanhSachSuatChieuTheoCumRap = () => {
        return danhSachSuatChieu.map((suatChieu, index) => {
            return <option
                className='my-2 py-2 px-3 text-black'
                key={index}
                value={suatChieu.maLichChieu}
            >
                {moment(suatChieu.ngayChieuGioChieu).format(DateFormat)} | {suatChieu.giaVe.toLocaleString()} VND
            </option>
        })
    };

    return (
        <div className='w-full h-36 mb-2 relative flex justify-center'>
            <div className='search-box p-3 w-11/12 rounded-2xl absolute z-10 bottom-0'>
                <div className='w-11/12 mx-auto grid grid-cols-5'>
                    <div className='col-span-3 w-full'>
                        <h1 className='text-3xl text-white font-bold'>Chào mừng bạn đến với MovieStar.vn</h1>
                        <h3 className='text-2xl text-white font-bold'>Bạn cần tìm kiếm phim gì?</h3>
                    </div>
                    <div className='col-span-2 w-full mx-auto flex justify-between items-center'>
                        <button className='py-2 px-3 rounded-2xl bg-rose-500/70 text-white font-bold'
                        >
                            Tìm theo phim
                        </button>
                        <button
                            className='py-2 px-3 rounded-2xl bg-rose-500/70 text-white font-bold'
                        >
                            Tìm theo rạp
                        </button>
                        <button
                            className='py-2 px-3 rounded-2xl bg-rose-500/70 text-white font-bold'
                        >
                            Tìm theo thời gian
                        </button>
                    </div>
                </div>
                <form
                    onSubmitCapture={formik.handleSubmit}
                    className='w-full h-20 mx-auto mt-5 px-5 bg-black/60 flex justify-between items-center'
                >
                    <div className='flex justify-between'>
                        <Popover
                            title="Tên phim"
                            trigger="click"
                            content={FilmInputcontent}
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <input
                                className='w-64 h-8 px-2 bg-transparent border-b border-b-white text-white focus:outline-none'
                                onkey
                                placeholder='Tìm tên phim'
                                name='tenPhim'
                                onChange={formik.handleChange}
                                value={formik.values.tenPhim}
                            />
                        </Popover>

                    </div>
                    <div className='flex justify-between'>
                        <span className='text-rose-400 font-bold text-base my-auto mr-3 flex items-center justify-between'>
                            <img className='mr-2' src={heThongRapIcon} /> Hệ thống rạp
                        </span>
                        <select
                            className='bg-transparent text-white focus:outline-none'
                            name='maHeThongRap'
                            onChange={formik.handleChange}
                            onClick={() => {
                                if (formik.values.maPhim.trim() === '') {
                                    message.warning('Vui lòng chọn tên phim!')
                                }
                            }}
                        >
                            <option value="" disabled selected>Chọn hệ thống rạp</option>
                            {renderDanhSachHeThongRap()}
                        </select>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-rose-400 font-bold text-base my-auto mr-3 flex items-center justify-between'>
                            <img className='mr-2' src={cumRapIcon} /> Cụm rạp
                        </span>
                        <select
                            className='bg-transparent text-white focus:outline-none'
                            name='maCumRap'
                            onChange={formik.handleChange}
                            onClick={() => {
                                if (formik.values.maHeThongRap.trim() === '') {
                                    message.warning('Vui lòng chọn hệ thống rạp!')
                                }
                            }}
                        >
                            <option value="" disabled selected>Chọn cụm rạp</option>
                            {renderDanhSachCumRapTheoHeThongRap()}
                        </select>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-rose-400 font-bold text-base my-auto mr-3 flex items-center justify-between'>
                            <img className='mr-2' src={thoiGianChieuIcon} /> Suất chiếu
                        </span>
                        <select
                            className='bg-transparent text-white focus:outline-none'
                            name='maLichChieu'
                            onChange={formik.handleChange}
                            onClick={() => {
                                if (formik.values.maHeThongRap.trim() === '') {
                                    message.warning('Vui lòng chọn cụm rạp!')
                                }
                            }}
                        >
                            <option value="" disabled selected>Chọn suất chiếu</option>
                            {renderDanhSachSuatChieuTheoCumRap()}
                        </select>
                    </div>
                    <Link to={`/dat-ve/${formik.values.maLichChieu}`}>
                        <button
                            type='submit'
                        >
                            <FontAwesomeIcon className='text-xl px-3 py-3 rounded-full bg-white/30 text-white/60 hover:text-white' icon={faMagnifyingGlass} />
                        </button>
                    </Link>
                </form>

            </div>
        </div>
    )
}
