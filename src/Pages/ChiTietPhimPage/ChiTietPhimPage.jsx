import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getThongTinPhimAsync, selectThongTinPhim } from '../../reduxToolkit/phimSlice';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import styles from '../css/ChiTietPhimPage.css';
import moment from 'moment';
import { message, Rate, Tabs } from 'antd';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import BookingTicketBoxChiTietPhimPage from './BookingTicketBoxChiTietPhimPage/BookingTicketBoxChiTietPhimPage';

const { TabPane } = Tabs;
const dateFormat = 'DD/MM/YYYY';

export default function ChiTietPhimPage(props) {

  let dispatch = useDispatch();

  //Lấy mã phim từ url
  let { maPhim } = useParams();

  useEffect(() => {
    //Gọi API lấy thông tin phim chi tiết theo mã phim
    dispatch(getThongTinPhimAsync(maPhim));
  }, [maPhim]);

  //Lấy thông tin phim chi tiết từ redux state phimSlice
  let thongTinPhim = useSelector(selectThongTinPhim);

  //Điều khiển hiển thị trailer card
  let [isTrailerCardOpen, setIsTrailerCardOpen] = useState(false)
  let [trailerLink, setTrailerLink] = useState('');

  const closeTrailerCard = () => {
    setIsTrailerCardOpen(false)
  };

  const openTrailerCard = () => {
    setIsTrailerCardOpen(true)
  };

  //Lưu trữ điểm đánh giá phim từ người truy cập
  let [movieRate, setMovieRate] = useState(0);
  const handleRatingMovie = (value) => {
    setMovieRate(value);
    message.success('Cảm ơn bạn đã đánh giá bộ phim này');
  };

  return (
    <div className='w-full'>
      <div className='movie-cover-container w-full relative'>
        <div className='w-full h-full absolute top-0 bg-black/50' />
        <img className='movie-cover h-full' src={thongTinPhim.hinhAnh} />
      </div>
      <div className='movie-title-container relative
      w-full mb-5
      md:mb-32
      lg:w-full lg:mb-32'>
        <div className='movie-title absolute z-10 w-full bottom-0'>
          <div className='
          w-full h-fit pb-2
          md:w-11/12 md:mx-auto md:h-48 md:pb-0
          lg:w-9/12 lg:mx-auto lg:h-28 lg:pb-0'>
            <div className='w-full
            md:flex md:items-center
            lg:flex lg:items-start'>
              <div className='
              w-0
              md:w-72 md:overflow-hidden md:relative
              lg:w-72 lg:overflow-hidden lg:relative'>
                <div className='
                md:w-full md:h-full md:rounded md:absolute md:flex md:items-center md:justify-center
                lg:w-full lg:h-full lg:rounded lg:absolute lg:flex lg:items-center lg:justify-center'>
                  <div className='
                  md:w-14 md:h-14 md:bg-white/40 md:rounded-full md:flex md:justify-center md:group md:hover:scale-150 md:duration-500
                  lg:w-14 lg:h-14 lg:bg-white/40 lg:rounded-full lg:flex lg:justify-center lg:group lg:hover:scale-150 lg:duration-500'>
                    <FontAwesomeIcon
                      className='
                      text-transparent
                      md:text-5xl md:text-white/50 md:bg-rose-500/50 md:rounded-full md:my-auto md:cursor-pointer md:group-hover:bg-rose-500 md:group-hover:text-white md:duration-500
                      lg:text-5xl lg:text-white/50 lg:bg-rose-500/50 lg:rounded-full lg:my-auto lg:cursor-pointer lg:group-hover:bg-rose-500 lg:group-hover:text-white lg:duration-500'
                      icon={faCirclePlay}
                      onClick={() => {
                        openTrailerCard()
                        setTrailerLink(thongTinPhim.trailer)
                      }}
                    />
                  </div>
                </div>
                <img className='mx-auto h-72 rounded' src={thongTinPhim.hinhAnh} />
              </div>
              <div className='w-full h-fit
              md:ml-5
              lg:ml-5'>
                <p className='font-bold text-white tracking-wider
                text-3xl text-center
                md:text-3xl md:text-left
                lg:text-5xl lg:text-left'>
                  {thongTinPhim.tenPhim}
                </p>
                <p className='
                text-center text-lg text-white/70 italic mt-5 tracking-wide
                md:text-left
                lg:text-left'>
                  <FontAwesomeIcon className='mr-2' icon={faCalendarDays} />
                  Khởi chiếu ngày {moment(thongTinPhim.ngayKhoiChieu).format(dateFormat)}
                </p>
              </div>
            </div>
          </div>
          <div className='w-full bg-rose-500
          py-2
          md:py-5
          lg:h-32 lg:py-0'>
            <div className='h-full 
            w-full flex flex-wrap
            md:w-7/12 md:ml-56 md:flex md:items-center md:justify-start
            lg:w-4/12 lg:ml-96 lg:pl-8 lg:flex lg:items-center lg:justify-start'>
              <div className=' 
              w-11/12 mx-auto flex justify-between items-start
              md:block md:w-fit md:mx-5
              lg:block lg:w-fit lg:mx-5'>
                <div className='w-fit h-full flex items-start'>
                  <Rate
                    className='my-auto h-full text-yellow-500
                    text-base
                    md:text-base
                    lg:text-base'
                    allowHalf
                    disabled
                    value={thongTinPhim.danhGia / 2}
                  />
                  <p
                    className='text-white font-bold 
                    text-lg
                    md:text-lg md:ml-2
                    lg:text-2xl lg:ml-2'>
                    {thongTinPhim.danhGia / 2}/5
                  </p>
                </div>
                <p
                  className='text-center font-bold text-white 
                  text-base w-fit
                  md:text-base
                  lg:text-base'>
                  Người dùng đánh giá
                </p>
              </div>
              <div className='
              w-11/12 mx-auto flex justify-between items-start
              md:block md:w-fit md:mx-5
              lg:block lg:w-fit lg:mx-5'>
                <div className='w-fit h-full flex items-start'>
                  <Rate
                    className='my-auto text-yellow-500
                    text-base
                    md:text-base
                    lg:text-base'
                    allowHalf
                    defaultValue={movieRate}
                    onChange={handleRatingMovie}
                  />
                  <p
                    className='text-white font-bold
                    text-lg
                    md:text-lg md:ml-2
                    lg:text-2xl lg:ml-2'>
                    {movieRate}/5
                  </p>
                </div>
                <p
                  className='text-center font-bold text-white
                  text-base w-fit
                  md:text-base
                  lg:text-base'>
                  Đánh giá của bạn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-5'>
        <BookingTicketBoxChiTietPhimPage maPhim={thongTinPhim.maPhim} tenPhim={thongTinPhim.tenPhim} />
      </div>

      <div className='movie-tab-detail-movie-page mx-auto mb-5 border border-gray-300 rounded-xl shadow-xl p-5
      w-11/12 h-fit
      md:grid md:grid-cols-12
      lg:grid lg:grid-cols-12'>
        <Tabs
          className='
          md:col-span-9
          lg:col-span-9'
          defaultActiveKey="1"
          tabPosition='top'>
          <TabPane tab="MÔ TẢ PHIM" key="1">
            <div className='movie-tab-item w-11/12 mx-auto'>
              {thongTinPhim.moTa}
            </div>
          </TabPane>
          <TabPane tab="ĐÁNH GIÁ PHIM" key="2">
            <div className='movie-tab-item w-11/12 mx-auto'>
              {thongTinPhim.moTa}
            </div>
          </TabPane>
        </Tabs>
        <div className='
        w-0
        md:w-fit md:col-span-3 md:flex md:justify-center
        lg:w-fit lg:col-span-3 lg:flex lg:justify-center'>
          <img 
          className='
          h-0
          md:w-72 md:h-96
          lg:w-72 lg:h-96' 
          src={thongTinPhim.hinhAnh} />
        </div>
      </div>
      <div className='mx-auto
      w-11/12 my-2
      md:my-5
      lg:w-10/12 lg:my-10'>
        <iframe className='w-full rounded-lg
        h-48
        md:h-96
        lg:h-screen' 
        height={600} 
        src={thongTinPhim.trailer} 
        title="Movie trailer" />
      </div>
      <Transition appear show={isTrailerCardOpen}> {/*Trailer card*/}
        <Dialog as="div" className="relative z-10" onClose={closeTrailerCard}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-8/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <iframe className='w-full' height={500} src={trailerLink} title="Movie trailer" />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
