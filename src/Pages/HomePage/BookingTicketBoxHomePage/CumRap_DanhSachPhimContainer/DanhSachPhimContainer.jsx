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
            className='w-40 h-8 m-2 py-1 rounded bg-gray-100 text-rose-500 text-sm font-bold duration-300 hover:bg-rose-500 hover:text-white hover:shadow-lg'
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
        className='w-full my-5 grid grid-cols-12 border-b border-b-gray-200'
      >
        <div className='col-span-3 flex items-center justify-center'>
          <img className='w-48 h-64' src={phim.hinhAnh} />
        </div>
        <div className='col-span-9'>
          <Link to={`/phim/${phim.maPhim}`}>
            <p className='w-11/12 mx-auto mb-2 text-xl font-bold text-rose-500 hover:underline'>
              {phim.tenPhim}
            </p>
          </Link>
          <div className='w-full h-60 grid grid-cols-3 overflow-y-scroll overflow-x-hidden'>
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
