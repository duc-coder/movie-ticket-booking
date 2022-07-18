import React, { useEffect } from 'react'
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
      <div className='
      w-full py-5
      md:py-5 md:grid md:grid-cols-12
      lg:w-11/12 lg:mx-auto lg:py-5 lg:grid lg:grid-cols-12'>
        <div className='
        md:col-span-8
        lg:col-span-9'>
          <DanhSachGhe DanhSachGhe={danhSachPhongVe.danhSachGhe} />
        </div>
        <div className='
        mt-5
        md:col-span-4 md:mt-5
        lg:col-span-3 lg:mt-5'>
          <CheckoutCard ThongTinPhim={danhSachPhongVe.thongTinPhim} />
        </div>
      </div>
    </div>
  )
}
