import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDanhSachBannerAsync, getDanhSachPhimAsync, selectDanhSachBanner, selectDanhSachPhim } from '../../reduxToolkit/phimSlice';
import { getDanhSachHeThongRapAsync, selectDanhSachHeThongRap } from '../../reduxToolkit/rapSlice';
import BannerHomePage from './BannerHomePage/BannerHomePage';
import BookingTicketBoxHomePage from './BookingTicketBoxHomePage/BookingTicketBoxHomePage';
import DanhSachPhimHomePage from './DanhSachPhimHomePage/DanhSachPhimHomePage';
import SearchFilmBoxHomePage from './SearchFilmBoxHomePage/SearchFilmBoxHomePage';

export default function HomePage() {

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDanhSachBannerAsync());
    dispatch(getDanhSachPhimAsync());
    dispatch(getDanhSachHeThongRapAsync());
  }, []);

  let danhSachHeThongRap = useSelector(selectDanhSachHeThongRap);
  let danhSachBanner = useSelector(selectDanhSachBanner);
  let danhSachPhim = useSelector(selectDanhSachPhim);

  return (
    <div className='home-page'>
      <BannerHomePage danhSachBanner={danhSachBanner} />
      <SearchFilmBoxHomePage
        danhSachHeThongRap={danhSachHeThongRap}
        danhSachPhim={danhSachPhim}
      />
      <DanhSachPhimHomePage
        danhSachPhim={danhSachPhim}
      />
      <BookingTicketBoxHomePage
        danhSachHeThongRap={danhSachHeThongRap}
      />
    </div>
  )
}
