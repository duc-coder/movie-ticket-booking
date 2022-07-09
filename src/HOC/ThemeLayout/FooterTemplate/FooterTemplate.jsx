import React from 'react';
import footerBackground from '../../../assets/img/footer_bg.jpg';
import styles from '../css/FooterTemplate.css';

export default function FooterTemplate() {
  return (
    <div className='footer w-full flex items-center'>
      <div className='w-9/12 mx-auto flex justify-between items-center'>
        <div className=''>
          <h2 className='text-white text-2xl font-bold underline'>PHIM</h2>
          <h3 className='text-white text-base my-2'>Phim đang chiếu</h3>
          <h3 className='text-white text-base my-2'>Phim sắp chiếu</h3>
          <h3 className='text-white text-base my-2'>Phim tháng 7/2022</h3>
          <h3 className='text-white text-base my-2'>Đánh giá phim</h3>
        </div>

        <div>
          <h2 className='text-white text-2xl font-bold underline'>RẠP</h2>
          <h3 className='text-white text-base my-2'>CGV</h3>
          <h3 className='text-white text-base my-2'>lotte</h3>
          <h3 className='text-white text-base my-2'>Galaxy</h3>
          <h3 className='text-white text-base my-2'>BHD</h3>
        </div>

        <div>
          <h2 className='text-white text-2xl font-bold underline'>PHIM SẮP RA MẮT</h2>
          <h3 className='text-white text-base my-2'>VÔ DIỆN SÁT NHÂN - 07/07/2022</h3>
          <h3 className='text-white text-base my-2'>QUỲNH HOA NHẤT DẠ - 07/07/2022</h3>
          <h3 className='text-white text-base my-2'>DÂN CHƠI KHÔNG SỢ CON RƠI - 29/07/2022</h3>
        </div>
      </div>
    </div>
  )
}
