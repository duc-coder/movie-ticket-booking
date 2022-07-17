import { useFormik } from 'formik';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popover, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/BookingTicketBoxChiTietPhimPage.css';
import heThongRapIcon from '../../../assets/img/cinema.png';
import cumRapIcon from '../../../assets/img/city.png';
import thoiGianChieuIcon from '../../../assets/img/date.png';
import { getDanhSachLichChieuPhimAsync, selectDanhSachLichChieuPhim } from '../../../reduxToolkit/rapSlice';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

export default function BookingTicketBoxChiTietPhimPage(props) {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  //Nhận mã phim từ ChiTietPhimPage
  let { maPhim, tenPhim } = props;

  useEffect(() => {
    //Gọi API lấy danh sách lịch chiếu phim mã phim (có thông tin hệ thống rạp, cụm rạp, suất chiếu)
    if (maPhim !== 0) {
      dispatch(getDanhSachLichChieuPhimAsync(maPhim));
    }
  }, [maPhim])


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
      maPhim: maPhim,
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
    <div className='w-full relative
    md:h-72 md:mb-2 md:flex md:justify-center
    lg:h-36 lg:mb-2 lg:flex lg:justify-center'>
      <div className='search-box rounded-2xl mx-auto
      h-fit w-11/12 p-3
      md:p-3 md:w-9/12 md:absolute md:z-10 md:bottom-0
      lg:p-3 lg:w-10/12 lg:h-44 lg:absolute lg:z-10 lg:bottom-0'>
        <h1 className='w-full text-white font-bold
        md:text-center md:text-xl
        lg:text-left lg:text-3xl'>
          Đặt vé xem phim - {tenPhim}
        </h1>
        <form
          onSubmitCapture={formik.handleSubmit}
          className='w-full h-fit mx-auto mt-5 px-5 bg-black/60 
          flex flex-wrap justify-center items-center py-2
          md:py-5
          lg:h-20 lg:flex lg:flex-nowrap lg:justify-between lg:items-center lg:py-0'
        >
          <div className='w-full flex justify-between
          my-3
          md:my-5
          lg:my-0 lg:justify-start'>
            <span className='text-rose-400 font-bold my-auto flex items-center justify-between
            text-xs
            md:text-base md:mr-3
            lg:text-base lg:mr-3'>
              <img className='mr-2' src={heThongRapIcon} /> Hệ thống rạp
            </span>
            <select
              className='bg-transparent text-white focus:outline-none text-xs
              lg:text-sm'
              name='maHeThongRap'
              onChange={formik.handleChange}
            >
              <option value="" disabled selected>Chọn hệ thống rạp</option>
              {renderDanhSachHeThongRap()}
            </select>
          </div>
          <div className='w-full flex justify-between
          my-3
          md:my-5
          lg:my-0 lg:justify-start'>
            <span className='text-rose-400 font-bold my-auto flex items-center justify-between
            text-xs
            md:text-base md:mr-3
            lg:text-base lg:mr-3'>
              <img className='mr-2' src={cumRapIcon} /> Cụm rạp
            </span>
            <select
              className='bg-transparent text-white focus:outline-none text-xs
              lg:text-sm'
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
          <div className='w-full flex justify-between
          my-3
          md:my-5
          lg:my-0 lg:justify-start'>
            <span className='text-rose-400 font-bold my-auto flex items-center justify-between
            text-xs
            md:text-base md:mr-3
            lg:text-base lg:mr-3'>
              <img className='mr-2' src={thoiGianChieuIcon} /> Suất chiếu
            </span>
            <select
              className='bg-transparent text-white focus:outline-none text-xs
              lg:text-sm'
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
          <Link
            to={`/dat-ve/${formik.values.maLichChieu}`}
            className='w-full lg:w-fit'>
            <button
              type='submit'
              className='w-full lg:w-fit'
            >
              <FontAwesomeIcon
                className='rounded-full bg-white/30 text-white/60 hover:text-white
                w-full py-2
                lg:w-fit lg:text-xl lg:px-3 lg:py-3'
                icon={faMagnifyingGlass} />
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}
