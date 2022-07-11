import React from 'react'
import { datVeAsync, selectgheDangChon } from '../../../reduxToolkit/datVeSlice';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

export default function CheckoutCard(props) {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  //Nhận value thông tin phim từ DatVePage
  let { ThongTinPhim } = props;

  //Nhận danh sách ghế đang chọn từ redux state datVeSlice
  let gheDangChon = useSelector(selectgheDangChon);

  //Giá trị gheDangChon ban đầu
  let thongTinGhe = [];
  if (gheDangChon.length > 0) {
    thongTinGhe = gheDangChon;
  } else {
    thongTinGhe = [
      {
        maGhe: 0,
        tenGhe: 'Hãy chọn ghế',
        giaVe: 0,
      },
    ]
  };

  const renderThongTinVe = () => { //Render các ghế đang chọn
    return thongTinGhe.map((ghe, index) => {
      return <p
        key={index}
      >
        {ghe.tenGhe} - {ghe.giaVe.toLocaleString()} VND
      </p>
    })
  };
  //Render tổng tiền vé các ghế đang chọn
  const renderTongTienVe = thongTinGhe.reduce((total, item) => {
    return total += item.giaVe;
  }, 0);

  //Xử lý đặt vé
  const handleDatVe = () => {
    let thongTinVe = { // Tạo form thông tin vé
      maLichChieu: ThongTinPhim.maLichChieu,
      danhSachVe: thongTinGhe.map((ghe, index) => {
        return {
          maGhe: ghe.maGhe,
          giaVe: ghe.giaVe,
        }
      }),
    };
    dispatch(datVeAsync(thongTinVe)); //Gọi API đặt vé
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className='mx-2 p-2 bg-white'>
      <div className='w-full flex justify-center'>
        <img
          className='h-96'
          src={
            _.isEmpty(ThongTinPhim)
              ? ''
              : ThongTinPhim.hinhAnh
          }
        />
      </div>
      <div className='w-11/12 mx-auto mt-5 flex items-start justify-between border-b border-gray-400'>
        <p className='text-base font-bold'>Ghế đang chọn:</p>
        <div>
          {renderThongTinVe()}
        </div>
      </div>
      <div className='w-11/12 mx-auto mt-5 flex items-end justify-between border-b border-gray-400'>
        <p className='text-base font-bold'>Tổng tiền:</p>
        <p className='text-lg font-bold'>
          {renderTongTienVe.toLocaleString()} VND
        </p>
      </div>
      <div className='w-11/12 mx-auto'>
        <button
          className='w-full mt-5 bg-rose-500 text-white text-xl font-bold py-1'
          onClick={() => { handleDatVe() }}
        >
          ĐẶT VÉ
        </button>
      </div>
    </div>
  )
}
