import React from 'react';
import footerBackground from '../../../assets/img/footer_bg.jpg';
import styles from '../css/FooterTemplate.css';

export default function FooterTemplate() {
  return (
    <div className='footer w-full flex items-center'>
      <div className='mx-auto  
      w-full px-2 grid grid-cols-3
      md:flex md:justify-between md:items-start md:w-9/12 md:px-0
      lg:flex lg:justify-between lg:items-center lg:w-9/12 lg:px-0'>
        <div className=''>
          <h2 className='text-white font-bold underline
          text-xs text-center
          md:text-2xl
          lg:text-2xl'>PHIM</h2>
          <h3
            className='text-white 
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            Phim đang chiếu
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            Phim sắp chiếu
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            Phim tháng 7/2022
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            Đánh giá phim
          </h3>
        </div>

        <div>
          <h2 className='text-white font-bold underline
          text-xs text-center
          md:text-2xl
          lg:text-2xl'>RẠP</h2>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            CGV
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            lotte
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            Galaxy
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            BHD
          </h3>
        </div>

        <div>
          <h2 className='text-white font-bold underline
          text-xs text-center
          md:text-2xl
          lg:text-2xl'>PHIM SẮP RA MẮT</h2>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            VÔ DIỆN SÁT NHÂN - 07/07/2022
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            QUỲNH HOA NHẤT DẠ - 07/07/2022
          </h3>
          <h3
            className='text-white
            text-xs my-2 text-center
            md:my-1 md:text-base
            lg:text-base lg:my-2'>
            DÂN CHƠI KHÔNG SỢ CON RƠI - 29/07/2022
          </h3>
        </div>
      </div>
    </div>
  )
}
