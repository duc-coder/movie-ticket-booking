import React, { Fragment } from 'react';
import Banner from '../../../assets/img/banner_datVePage.jpg';
import _ from 'lodash';

export default function BannerDatVePage(props) {

    //Nhận value thông tin phim từ DatVePage
    let { ThongTinPhim } = props;

    return (
        <div className='w-full relative'>
            <div className='w-full overflow-hidden
            md:h-fit
            lg:h-fit'>
                <div className='w-full absolute top-0 z-0 bg-black/50 h-full' />
                <img className='movie-cover
                h-52
                md:h-56
                lg:h-72' 
                src={Banner} />
            </div>
            {
                _.isEmpty(ThongTinPhim)
                    ? <Fragment />
                    : <Fragment>
                        <div className='w-full absolute bottom-0'>
                            <p className='text-white font-bold text-center
                            text-lg mb-14
                            md:text-4xl md:mb-5
                            lg:text-7xl lg:mb-10'>
                                {ThongTinPhim.tenPhim}
                            </p>
                            <div className='
                            w-full pb-5 flex items-center justify-between
                            md:w-11/12 md:pb-5 md:mx-auto md:flex md:items-center md:justify-between
                            lg:w-7/12 lg:pb-5 lg:mx-auto lg:flex lg:items-center lg:justify-between'>
                                <div className='mx-2'>
                                    <p className='text-white font-bold text-center
                                    text-sm
                                    md:text-base
                                    lg:text-lg'>
                                        {ThongTinPhim.tenCumRap}
                                    </p>
                                    <p className='text-white text-sm text-center italic'>Cụm rạp</p>
                                </div>
                                <div className='mx-2'>
                                    <p className='text-white font-bold text-center
                                    text-sm
                                    md:text-base
                                    lg:text-lg'>
                                        {ThongTinPhim.tenRap}
                                    </p>
                                    <p className='text-white text-sm text-center italic'>Rạp số</p>
                                </div>
                                <div className='mx-2'>
                                    <p className='text-white font-bold text-center
                                    text-sm
                                    md:text-base
                                    lg:text-lg'>
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
