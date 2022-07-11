import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react'
import Slider from 'react-slick';
import styles from '../css/BannerHomePage.css';
import { Link } from 'react-router-dom';

export default function BannerHomePage(props) {

    let ref = useRef();

    const goToPrev = () => {
        ref.current.slickPrev();
    };

    const goToNext = () => {
        ref.current.slickNext();
    };

    let { danhSachBanner } = props;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const renderBannerSlide = () => {
        if (danhSachBanner.length > 1) {
            return danhSachBanner.map((image, index) => {
                return <div
                    key={index}
                    className='w-full overflow-hidden'
                >
                    <Link to={`/phim/${image.maPhim}`}>
                        <img
                            src={image.hinhAnh}
                            alt='film-banner'
                            className='w-full bg-cover home-page-banner'
                        />
                    </Link>
                </div>
            })
        }
    };

    return (
        <div className='banner w-full relative'>
            <Slider
                {...settings}
                ref={ref}
            >
                {renderBannerSlide()}
            </Slider>
            <div className='w-full'>
                <button
                    className='h-96 text-white absolute top-0 left-0 w-20 hover:bg-black/30'
                    onClick={goToPrev}
                >
                    <FontAwesomeIcon className='text-4xl text-white/50 hover:text-white' icon={faChevronCircleLeft} />
                </button>
                <button
                    className='h-96 text-white absolute top-0 right-0 w-20 hover:bg-black/30'
                    onClick={goToNext}
                >
                    <FontAwesomeIcon className='text-4xl text-white/50 hover:text-white' icon={faChevronCircleRight} />
                </button>
            </div>
        </div>
    )
}
