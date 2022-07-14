import moment from 'moment';
import React from 'react';
import styles from '../css/DanhSachPhimContainer.css';
import { Link } from 'react-router-dom';

export default function DanhSachPhimContainer(props) {

  //Nhận props từ CumRap_DanhSachPhimContainer
  let { DSPhim } = props;

  //Render lịch chiếu phim theo từng phim
  let dateFormat = 'hh:mm - DD/MM/YYYY'
  const renderLichChieuPhim = (lstLichChieuTheoPhim) => {
    return lstLichChieuTheoPhim.map((suat, index) => {
      return <div
        key={index}
      >
        <Link to={`/dat-ve/${suat.maLichChieu}`}>
          <button
            className='rounded bg-gray-100 text-rose-500 font-bold duration-300 hover:bg-rose-500 hover:text-white hover:shadow-lg
            md:text-xs md:w-fit md:h-10 md:m-2 md:py-0
            lg:text-sm lg:w-40 lg:h-8 lg:m-2 lg:py-1'
          >
            {moment(suat.ngayChieuGioChieu).format(dateFormat)}
          </button>
        </Link>
      </div>
    })
  }

  //Render danh sách phim theo cụm rạp đang chọn
  const renderDanhSachPhim = () => {
    return DSPhim.map((phim, index) => {
      return <div
        key={index}
        className='
        md:w-full md:my-5 md:grid md:grid-cols-12 md:border-b md:border-b-gray-200
        lg:w-full lg:my-5 lg:grid lg:grid-cols-12 lg:border-b lg:border-b-gray-200'
      >
        <div className='
        md:col-span-3 md:flex md:items-center md:justify-center
        lg:col-span-3 lg:flex lg:items-center lg:justify-center'>
          <img className='
          md:w-48 md:h-64
          lg:w-48 lg:h-64' 
          src={phim.hinhAnh} />
        </div>
        <div className='
        md:col-span-9
        lg:col-span-9'>
          <Link to={`/phim/${phim.maPhim}`}>
            <p className='font-bold text-rose-500 hover:underline
            md:w-11/12 md:mx-auto md:mb-2 md:text-xl
            lg:w-11/12 lg:mx-auto lg:mb-2 lg:text-xl'>
              {phim.tenPhim}
            </p>
          </Link>
          <div className='
          md:w-11/12 md:mx-auto md:h-60 md:grid md:grid-cols-3 md:overflow-y-scroll md:overflow-x-hidden
          lg:w-full lg:h-60 lg:grid lg:grid-cols-3 lg:overflow-y-scroll lg:overflow-x-hidden'>
            {renderLichChieuPhim(phim.lstLichChieuTheoPhim)}
          </div>
        </div>
      </div>
    })
  }


  return (
    <div className='danh-sach-phim-container-main-div w-full'>
      {renderDanhSachPhim()}
    </div>
  )
}
