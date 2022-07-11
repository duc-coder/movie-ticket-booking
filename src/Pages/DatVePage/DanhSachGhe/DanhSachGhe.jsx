import React from 'react';
import Screen from '../../../assets/img/screen.png';
import RenderGhe from './RenderGhe';
import SeatPic from '../../../assets/img/seat.png';

export default function DanhSachGhe(props) {

  //Nhận value thông tin phim từ DatVePage
  let { DanhSachGhe } = props;

  return (
    <div className='mx-2'>
      <div className='w-full flex justify-center items-start my-2'>
        <div className='mx-2'>
          <img className='border-red-500 border-solid border rounded-full p-1 mx-auto' src={SeatPic} />
          <p className='text-center text-white font-bold mt-1 w-28'>Ghế đã đặt</p>
        </div>
        <div className='mx-2'>
          <img className='border-green-500 border-solid border rounded-full p-1 mx-auto' src={SeatPic} />
          <p className='text-center text-white font-bold mt-1 w-28'>Ghế đang chọn</p>
        </div>
        <div className='mx-2'>
          <img className='border-white border-solid border rounded-full p-1 mx-auto' src={SeatPic} />
          <p className='text-center text-white font-bold mt-1 w-28'>Ghế loại thường chưa chọn</p>
        </div>
        <div className='mx-2'>
          <img className='border-yellow-500 border-solid border rounded-full p-1 mx-auto' src={SeatPic} />
          <p className='text-center text-white font-bold mt-1 w-28'>Ghế loại VIP chưa chọn</p>
        </div>
        <div className='mx-2'>
          <img className='border-purple-500 border-solid border rounded-full p-1 mx-auto' src={SeatPic} />
          <p className='text-center text-white font-bold mt-1 w-28'>Ghế người khác đang chọn</p>
        </div>
        <div className='mx-2'>
          <img className='border-sky-500 border-solid border rounded-full p-1 mx-auto' src={SeatPic} />
          <p className='text-center text-white font-bold mt-1 w-28'>Ghế của mình đã đặt</p>
        </div>
      </div>

      <div className='w-full flex justify-center items-center'>
        <img src={Screen} />
      </div>

      <div className='w-full grid grid-cols-10 mt-5'>
        <RenderGhe DanhSachGhe={DanhSachGhe} />
      </div>
    </div>
  )
}
