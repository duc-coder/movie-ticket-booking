import React, { Fragment } from 'react';
import Banner from '../../../assets/img/banner_datVePage.jpg';
import _ from 'lodash';

export default function BannerDatVePage(props) {

    //Nhận value thông tin phim từ DatVePage
    let { ThongTinPhim } = props;

    return (
        <div className='w-full relative'>
            <div className='w-full h-80 overflow-hidden'>
                <div className='w-full h-full absolute top-0 z-0 bg-black/50' />
                <img className='movie-cover' src={Banner} />
            </div>
            {
                _.isEmpty(ThongTinPhim)
                    ? <Fragment />
                    : <Fragment>
                        <div className='w-full absolute bottom-0'>
                            <p className='text-white font-bold text-7xl text-center mb-10'>
                                {ThongTinPhim.tenPhim}
                            </p>
                            <div className='w-7/12 pb-5 mx-auto flex items-center justify-between'>
                                <div className='mx-2'>
                                    <p className='text-white font-bold text-lg text-center'>
                                        {ThongTinPhim.tenCumRap}
                                    </p>
                                    <p className='text-white text-sm text-center italic'>Cụm rạp</p>
                                </div>
                                <div className='mx-2'>
                                    <p className='text-white font-bold text-lg text-center'>
                                        {ThongTinPhim.tenRap}
                                    </p>
                                    <p className='text-white text-sm text-center italic'>Rạp số</p>
                                </div>
                                <div className='mx-2'>
                                    <p className='text-white font-bold text-lg text-center'>
                                        {ThongTinPhim.gioChieu} - {ThongTinPhim.ngayChieu}
                                    </p>
                                    <p className='text-white text-sm text-center italic'>Thời gian chiếu</p>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            }
        </div>
    )
}
