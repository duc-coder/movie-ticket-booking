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
    <div className='w-full h-36 mb-2 relative flex justify-center'>
      <div className='search-box p-3 w-10/12 rounded-2xl absolute z-10 bottom-0'>
        <h1 className='w-full text-3xl text-white font-bold'>Đặt vé xem phim - {tenPhim}</h1>
        <form
          onSubmitCapture={formik.handleSubmit}
          className='w-full h-20 mx-auto mt-5 px-5 bg-black/60 flex justify-between items-center'
        >
          <div className='flex justify-between'>
            <span className='text-rose-400 font-bold text-base my-auto mr-3 flex items-center justify-between'>
              <img className='mr-2' src={heThongRapIcon} /> Hệ thống rạp
            </span>
            <select
              className='bg-transparent text-white focus:outline-none'
              name='maHeThongRap'
              onChange={formik.handleChange}
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
