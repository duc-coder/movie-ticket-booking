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
        <img className='movie-cover' src={thongTinPhim.hinhAnh} />
      </div>
      <div className='movie-title-container w-full mb-32 relative'>
        <div className='movie-title w-full absolute z-10 bottom-0'>
          <div className='w-9/12 mx-auto h-28'>
            <div className='w-full flex'>
              <div className='w-72 overflow-hidden relative'>
                <div className='w-full h-full rounded absolute flex items-center justify-center'>
                  <div className='w-14 h-14 bg-white/40 rounded-full flex justify-center group hover:scale-150 duration-500'>
                    <FontAwesomeIcon
                      className='bg-rose-500/50 rounded-full text-white/50 my-auto cursor-pointer text-5xl group-hover:bg-rose-500 group-hover:text-white duration-500'
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
              <div className='w-full ml-5'>
                <p className='text-5xl font-bold text-white tracking-wider'>
                  {thongTinPhim.tenPhim}
                </p>
                <p className='text-lg text-white/70 italic mt-5 tracking-wide'>
                  <FontAwesomeIcon className='mr-2' icon={faCalendarDays} />
                  Khởi chiếu ngày {moment(thongTinPhim.ngayKhoiChieu).format(dateFormat)}
                </p>
              </div>
            </div>
          </div>
          <div className='w-full h-32 bg-rose-500'>
            <div className='h-full w-5/12 mx-auto flex items-center justify-between'>
              <div className='mx-5'>
                <div className='mt-2 flex items-center'>
                  <Rate
                    className='text-base my-auto text-yellow-500'
                    allowHalf
                    disabled
                    value={thongTinPhim.danhGia / 2}
                  />
                  <p className='text-white text-2xl font-bold ml-2'>{thongTinPhim.danhGia / 2}/5</p>
                </div>
                <p className='text-center font-bold text-white text-base'>Người dùng đánh giá</p>
              </div>
              <div className='mx-5'>
                <div className='mt-2 flex items-center'>
                  <Rate
                    className='text-base my-auto text-yellow-500'
                    allowHalf
                    defaultValue={movieRate}
                    onChange={handleRatingMovie}
                  />
                  <p className='text-white text-2xl font-bold ml-2'>{movieRate}/5</p>
                </div>
                <p className='text-center font-bold text-white text-base'>Người dùng đánh giá</p>
              </div>
              <div className='mx-5'>
                <button
                  className='w-28 text-lg font-bold px-2 py-1 rounded-2xl bg-white hover:shadow-md hover:shadow-gray-300'
                >
                  ĐẶT VÉ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-5'>
        <BookingTicketBoxChiTietPhimPage maPhim={thongTinPhim.maPhim} tenPhim={thongTinPhim.tenPhim} />
      </div>

      <div className='movie-tab-detail-movie-page w-11/12 mx-auto mb-5 grid grid-cols-12 border border-gray-300 rounded-xl shadow-xl p-5'>
        <Tabs className='col-span-9' defaultActiveKey="1" tabPosition='right'>
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
        <div className='col-span-3 flex justify-center'>
          <img className='w-72 h-96' src={thongTinPhim.hinhAnh} />
        </div>
      </div>
      <div className='w-10/12 mx-auto my-10'>
        <iframe className='w-full rounded-lg' height={600} src={thongTinPhim.trailer} title="Movie trailer" />
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
