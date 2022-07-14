import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react'
import Slider from 'react-slick';
import styles from '../css/BannerHomePage.css';
import { Link } from 'react-router-dom';
import _ from 'lodash';

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
        if (_.size(danhSachBanner) > 1) {
            return danhSachBanner.map((image, index) => {
                return <div
                    key={index}
                    className='w-full overflow-hidden'
                >
                    <Link to={`/phim/${image.maPhim}`}>
                        <img
                            src={image.hinhAnh}
                            alt='film-banner'
                            className='w-full bg-cover home-page-banner h-52
                            lg:h-96 
                            md:h-80'
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
                    className='text-white absolute hover:bg-black/30
                    h-52 top-0 left-0 w-14
                    lg:h-96 lg:w-20
                    md:h-80 md:w-20'
                    onClick={goToPrev}
                >
                    <FontAwesomeIcon
                        className='text-white/50 hover:text-white
                        text-xl
                        lg:text-4xl
                     md:text-4xl'
                        icon={faChevronCircleLeft} />
                </button>
                <button
                    className='text-white absolute hover:bg-black/30
                    h-52 top-0 right-0 w-14
                    lg:h-96 lg:w-20
                    md:h-80 md:w-20'
                    onClick={goToNext}
                >
                    <FontAwesomeIcon
                        className='text-white/50 hover:text-white
                        text-xl
                        lg:text-4xl
                        md:text-4xl'
                        icon={faChevronCircleRight} />
                </button>
            </div>
        </div>
    )
}
