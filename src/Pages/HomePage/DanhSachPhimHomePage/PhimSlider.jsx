import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Rate } from 'antd';
import React, { Fragment, useState } from 'react';
import Slider from 'react-slick';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, Link } from 'react-router-dom';

export default function PhimSlider(props) {

    const navigate = useNavigate();

    //Props nhận từ DanhSachPhimHomePage
    let { DSPhim } = props;

    //Điều khiển chuyển slide
    const customSlider = React.createRef();
    const goToNext = () => {
        customSlider.current.slickNext();
    };
    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    //Custom tính năng slider
    const SliderSettings = {
        dots: false,
        infinite: DSPhim.length > 5 ? true : false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    //Điều khiển hiển thị trailer card
    let [isTrailerCardOpen, setIsTrailerCardOpen] = useState(false)
    let [trailerLink, setTrailerLink] = useState('');

    const closeTrailerCard = () => {
        setIsTrailerCardOpen(false)
    };

    const openTrailerCard = () => {
        setIsTrailerCardOpen(true)
    };

    //render danh sách phim
    const dateFormat = 'DD/MM/YYYY'; //Định dạng thời gian ngày khởi chiếu

    const renderDanSachPhim = () => {
        return DSPhim.map((phim, index) => {
            return <div className='px-1' key={index}>
                <div
                    className='border border-gray-300 rounded-xl shadow-lg mx-2 overflow-hidden group relative'
                >
                    <div className='absolute top-1/4 z-0 w-full flex justify-center flex-wrap group-hover:z-10'>
                        <button
                            className='w-full my-2 mx-14 px-3 py-2 bg-rose-500 text-white rounded border border-transparent hover:border-rose-500 hover:bg-transparent hover:text-rose-500 duration-500 -translate-x-48 group-hover:translate-x-0'
                            onClick={() => {
                                openTrailerCard()
                                setTrailerLink(phim.trailer)
                            }}
                        >
                            Xem trailer
                        </button>
                        <button
                            className='w-full my-2 mx-14 px-3 py-2 border border-rose-500 text-rose-500 rounded hover:border-transparent hover:bg-rose-500 hover:text-white duration-500 translate-x-48 group-hover:translate-x-0'
                            onClick={() => { navigate(`/phim/${phim.maPhim}`) }}
                        >
                            Xem chi tiết
                        </button>
                    </div>
                    <div
                        className='w-full flex flex-wrap relative justify-center overflow-hidden'
                    >
                        <img
                            src={phim.hinhAnh}
                            className='w-full h-80 group-hover:scale-105'
                        />
                        <div className='absolute w-full h-80 group-hover:bg-black/60' />
                    </div>
                    <div
                        className='w-full my-5 flex flex-wrap justify-center'
                    >
                        <Link to={`/phim/${phim.maPhim}`}>
                            <p className='w-full text-center text-base font-bold hover:text-rose-500 duration-500'>
                                {phim.tenPhim}
                            </p>
                        </Link>
                        <p className='w-full my-2 text-center'>
                            <Rate
                                className='text-base text-rose-500'
                                allowHalf
                                disabled
                                defaultValue={phim.danhGia / 2}
                            /> {phim.danhGia / 2}/5
                        </p>
                        <p className='w-full text-center text-sm text-gray-500'>
                            Ngày khởi chiếu: {moment(phim.ngayKhoiChieu).format(dateFormat)}
                        </p>
                    </div>
                </div>
            </div>
        });
    }

    return (
        <div className="w-11/12 mx-auto relative">
            <Fragment>
                <Slider
                    ref={customSlider}
                    {...SliderSettings}
                    className='w-full'
                >
                    {renderDanSachPhim()}
                </Slider>
                <button
                    className='absolute left-1/3 px-3 py-2 ml-20 rounded-xl font-bold text-base bg-white text-rose-500 border border-gray-300 duration-1000 hover:bg-rose-500 hover:text-white hover:border-transparent'
                    onClick={() => { goToPrevious() }}
                >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
                <button
                    className='absolute right-1/3 px-3 py-2 mr-20 rounded-xl font-bold text-base bg-white text-rose-500 border border-gray-300 duration-1000 hover:bg-rose-500 hover:text-white hover:border-transparent'
                    onClick={() => { goToNext() }}
                >
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
            </Fragment>

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
