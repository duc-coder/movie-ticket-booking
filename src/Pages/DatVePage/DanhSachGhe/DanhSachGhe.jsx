import React from 'react';
import Screen from '../../../assets/img/screen.png';
import RenderGhe from './RenderGhe';
import SeatPic from '../../../assets/img/seat.png';

export default function DanhSachGhe(props) {

  //Nhận value thông tin phim từ DatVePage
  let { DanhSachGhe } = props;

  return (
    <div className='w-full lg:mx-2'>
      <div className='w-full flex justify-center items-start my-2'>
        <div className='mx-1 lg:mx-2'>
          <img
            className='border-red-500 border-solid border rounded-full p-1 mx-auto
            w-8
            md:w-10
            lg:w-fit'
            src={SeatPic} />
          <p
            className='text-center text-white mt-1 
            text-xs w-14
            md:w-20
            lg:w-28 lg:font-bold'>
            Ghế đã đặt
          </p>
        </div>
        <div className='mx-0.5 lg:mx-2'>
          <img
            className='border-green-500 border-solid border rounded-full p-1 mx-auto
            w-8
            md:w-10
            lg:w-fit'
            src={SeatPic} />
          <p
            className='text-center text-white mt-1 
            text-xs w-14
            md:w-20
            lg:w-28 lg:font-bold'>
            Ghế đang chọn
          </p>
        </div>
        <div className='mx-0.5 lg:mx-2'>
          <img
            className='border-white border-solid border rounded-full p-1 mx-auto
            w-8
            md:w-10
            lg:w-fit'
            src={SeatPic} />
          <p
            className='text-center text-white mt-1 
            text-xs w-14
            md:w-20
            lg:w-28 lg:font-bold'>
            Ghế loại thường chưa chọn
          </p>
        </div>
        <div className='mx-0.5 lg:mx-2'>
          <img
            className='border-yellow-500 border-solid border rounded-full p-1 mx-auto
            w-8
            md:w-10
            lg:w-fit'
            src={SeatPic} />
          <p
            className='text-center text-white mt-1 
            text-xs w-14
            md:w-20
            lg:w-28 lg:font-bold'>
            Ghế loại VIP chưa chọn
          </p>
        </div>
        <div className='mx-0.5 lg:mx-2'>
          <img
            className='border-purple-500 border-solid border rounded-full p-1 mx-auto
            w-8
            md:w-10
            lg:w-fit'
            src={SeatPic} />
          <p
            className='text-center text-white mt-1 
            text-xs w-14
            md:w-20
            lg:w-28 lg:font-bold'>
            Ghế người khác đang chọn
          </p>
        </div>
        <div className='mx-0.5 lg:mx-2'>
          <img
            className='border-sky-500 border-solid border rounded-full p-1 mx-auto
            w-8
            md:w-10
            lg:w-fit'
            src={SeatPic} />
          <p
            className='text-center text-white mt-1 
            text-xs w-14
            md:w-20
            lg:w-28 lg:font-bold'>
            Ghế của mình đã đặt
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center w-full'>
        <img
          className='w-11/12 mx-auto
          lg:w-fit'
          src={Screen} />
      </div>

      <div className='w-full grid grid-cols-10 mt-5 px-1
      md:px-0 lg:px-0'>
        <RenderGhe DanhSachGhe={DanhSachGhe} />
      </div>
    </div>
  )
}
