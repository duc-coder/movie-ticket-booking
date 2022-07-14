import { useFormik } from 'formik';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/SearchFilmBoxHomePage.css';
import heThongRapIcon from '../../../assets/img/cinema.png';
import cumRapIcon from '../../../assets/img/city.png';
import thoiGianChieuIcon from '../../../assets/img/date.png';
import { getDanhSachLichChieuPhimAsync, selectDanhSachLichChieuPhim } from '../../../reduxToolkit/rapSlice';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';


export default function SearchFilmBoxHomePage(props) {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Props truyền tư HomePage
    let { danhSachPhim } = props;

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
    if (_.size(danhSachLichChieuPhim.heThongRapChieu) > 1) {
        danhSachHeThongRapTheoPhim = danhSachLichChieuPhim.heThongRapChieu;
    };

    //Render danh sách phim vào popover
    const renderDanhSachPhim = () => {
        if (_.size(danhSachPhim) > 1) {
            return danhSachPhim.map((phim, index) => {
                return <p
                    className='cursor-pointer hover:bg-gray-300
                    lg:my-2 lg:py-1
                    md:my-2 md:py-1'
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
        <div className='overflow-y-scroll
        lg:h-52 
        md:h-52 md:w-60'>
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
                {moment(suatChieu.ngayChieuGioChieu).format(DateFormat)}
            </option>
        })
    };

    return (
        <div className='
        w-full px-2
        lg:w-full lg:h-36 lg:mb-2 lg:relative lg:flex lg:justify-center
        md:w-full md:h-44 md:mb-2 md:relative md:flex md:justify-center'>
            <div className='search-box 
            static w-full h-fit
            lg:p-3 lg:w-11/12 lg:h-fit lg:absolute lg:z-10 lg:bottom-0 lg:rounded-2xl
            md:p-2 md:w-11/12 md:h-fit md:absolute md:z-10 md:bottom-0 md:rounded-2xl'>
                <div className='
                w-full 
                lg:w-11/12 lg:mx-auto lg:grid lg:grid-cols-5
                md:w-full md:flex'>
                    <div className='
                    w-full pt-2
                    lg:col-span-3 lg:w-full lg:pt-0
                    md:flex-1 md:pt-0'>
                        <h1 className='text-white font-bold
                        text-center text-lg
                        lg:text-3xl lg:text-left
                        md:text-lg md:text-left'>
                            Chào mừng bạn đến với MovieStar.vn
                        </h1>
                        <h3 className='text-white font-bold
                        text-center
                        lg:text-2xl lg:text-left
                        md:text-base md:text-left'>
                            Bạn cần tìm kiếm phim gì?
                        </h3>
                    </div>
                    <div className='
                    w-full px-2 flex justify-between my-2
                    lg:col-span-2 lg:w-full lg:flex lg:justify-between lg:items-center lg:my-0
                    md:flex-1 md:w-full md:flex md:justify-between md:items-center md:my-0'>
                        <button className='rounded-2xl bg-rose-500/70 text-white font-bold
                        py-1 px-2 text-xs
                        lg:py-2 lg:px-3 lg:text-base
                        md:py-1 md:px-2 md:text-xs'
                        >
                            Tìm theo phim
                        </button>
                        <button className='rounded-2xl bg-rose-500/70 text-white font-bold
                        py-1 px-2 text-xs
                        lg:py-2 lg:px-3 lg:text-base
                        md:py-1 md:px-2 md:text-xs'
                        >
                            Tìm theo rạp
                        </button>
                        <button className='rounded-2xl bg-rose-500/70 text-white font-bold
                        py-1 px-2 text-xs
                        lg:py-2 lg:px-3 lg:text-base
                        md:py-1 md:px-2 md:text-xs'
                        >
                            Tìm theo thời gian
                        </button>
                    </div>
                </div>
                <form
                    onSubmitCapture={formik.handleSubmit}
                    className='bg-black/60 
                    w-full h-fit
                    lg:w-full lg:h-20 lg:mt-5 lg:px-5 lg:flex lg:flex-nowrap lg:justify-between lg:items-center
                    md:w-full md:h-fit md:mt-5 md:px-5 md:py-2 md:flex md:flex-wrap md:justify-between md:items-center'
                >
                    <div className='
                    w-full px-2
                    lg:flex lg:justify-between lg:w-fit lg:px-0
                    md:w-6/12 md:flex md:justify-start md:pr-5 md:px-0'>
                        <Popover
                            title="Tên phim"
                            trigger="click"
                            content={FilmInputcontent}
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <input
                                className='bg-transparent focus:outline-none text-white
                                w-full h-10 text-center border-b border-b-white
                                lg:w-64 lg:h-8 lg:px-2 lg:text-left
                                md:w-full md:h-8 md:px-2 md:text-left'
                                onkey
                                placeholder='Tìm tên phim'
                                name='tenPhim'
                                onChange={formik.handleChange}
                                value={formik.values.tenPhim}
                            />
                        </Popover>

                    </div>
                    <div className='
                    w-full flex justify-between items-center px-2 mt-3
                    lg:flex lg:flex-nowrap lg:justify-start lg:items-center lg:w-fit lg:px-0 lg:mt-0
                    md:w-6/12 md:flex md:flex-wrap md:justify-end md:pr-5 md:px-0 md:mt-0'>
                        <span className='text-rose-400 font-bold text-base my-auto
                        w-40 flex justify-start items-center 
                        lg:w-32 lg:text-base lg:mr-3 lg:justify-start 
                        md:w-full md:text-base md:justify-start'>
                            <img className='mr-2' src={heThongRapIcon} /> Hệ thống rạp
                        </span>
                        <select
                            className='bg-transparent text-white focus:outline-none w-fit'
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
                    <div className='
                    w-full flex justify-between items-center px-2 mt-3
                    lg:flex lg:flex-nowrap lg:justify-start lg:items-center lg:w-fit lg:mt-0 lg:px-0
                    md:w-6/12 md:mt-3 md:flex md:flex-wrap md:justify-end md:pr-5 md:px-0'>
                        <span className='text-rose-400 font-bold my-auto 
                        w-28 flex justify-start items-center 
                        lg:w-24 lg:text-base lg:mr-3 lg:flex lg:items-center lg:justify-start
                        md:w-full md:text-base md:flex md:items-center md:justify-start'>
                            <img className='mr-2' src={cumRapIcon} /> Cụm rạp
                        </span>
                        <select
                            className='bg-transparent text-white focus:outline-none w-fit flex flex-wrap'
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
                    <div className='
                    w-full flex justify-between items-center px-2 mt-3
                    lg:flex lg:flex-nowrap lg:justify-start lg:items-center lg:w-fit lg:mt-0 lg:px-0
                    md:w-6/12 md:mt-3 md:flex md:flex-wrap md:justify-end md:pr-5 md:px-0'>
                        <span className='text-rose-400 font-bold my-auto
                        w-32 flex justify-start items-center
                        lg:w-24 lg:text-base lg:mr-3 lg:flex lg:items-center lg:justify-start
                        md:w-full md:text-base md:flex md:items-center md:justify-start'>
                            <img className='mr-2' src={thoiGianChieuIcon} /> Suất chiếu
                        </span>
                        <select
                            className='bg-transparent text-white focus:outline-none w-fit'
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
                    <Link to={`/dat-ve/${formik.values.maLichChieu}`}
                        className='
                        w-full
                        lg:w-fit lg:h-fit'>
                        <button
                            type='submit'
                            className='
                            w-full
                            lg:w-fit lg:h-fit'
                        >
                            <FontAwesomeIcon className='bg-white/30 text-white/60 hover:text-white
                            w-11/12 mx-auto px-2 py-1 mt-3
                            lg:w-6 lg:h-6 lg:text-xl lg:px-3 lg:py-3 lg:rounded-full lg:my-auto
                            md:w-full md:py-1 md:mt-3 md:px-0'
                                icon={faMagnifyingGlass} />
                        </button>
                    </Link>
                </form>

            </div>
        </div>
    )
}
