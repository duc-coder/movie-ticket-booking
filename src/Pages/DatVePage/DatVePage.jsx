import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { danhSachPhongVeAsync, selectDanhSachPhongVe } from '../../reduxToolkit/datVeSlice';
import CheckoutCard from './CheckoutCard/CheckoutCard';
import DanhSachGhe from './DanhSachGhe/DanhSachGhe';
import BannerDatVePage from './BannerDatVePage/BannerDatVePage';
import _ from 'lodash';

export default function DatVePage() {
  let dispatch = useDispatch();
  //Lấy mã lịch chiếu từ url
  let { maLichChieu } = useParams();

  //Lấy thông tin phòng vé từ redux state datVeSlice theo mã lịch chiếu
  let danhSachPhongVe = useSelector(selectDanhSachPhongVe);

  useEffect(() => {
    //Gọi API lấy thông tin phòng vé theo mã lịch chiếu
    dispatch(danhSachPhongVeAsync(maLichChieu));
  }, [maLichChieu]);

  return (
    <div className='w-full bg-gray-700'>
      <BannerDatVePage ThongTinPhim={danhSachPhongVe.thongTinPhim} />
      <div className='w-11/12 mx-auto py-5 grid grid-cols-12'>
        <div className='col-span-9'>
          <DanhSachGhe DanhSachGhe={danhSachPhongVe.danhSachGhe} />
        </div>
        <div className='col-span-3'>
          <CheckoutCard ThongTinPhim={danhSachPhongVe.thongTinPhim} />
        </div>
      </div>
    </div>
  )
}
