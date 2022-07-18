import React, { Fragment, useEffect, useRef, useState } from 'react';
import logo from '../../../assets/img/movie_tickets_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Search from 'antd/lib/transfer/search';
import { useDispatch, useSelector } from 'react-redux';
import { dangXuat, selectThongTinNguoiDungDangNhap } from '../../../reduxToolkit/authSlice';
import { Menu, Popover } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styles from '../css/HeaderTemplate.css';

export default function HeaderTemplate() {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  //Lấy thông tin người dùng từ authSlice
  let ThongTinNguoiDungDangNhap = useSelector(selectThongTinNguoiDungDangNhap);

  //Điều khiển hiển thị menu người dùng
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
  };
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  //Render content menu người dùng
  const contentMenuBar = (
    <Menu className="
    w-fit
    md:w-fit
    lg:w-52">
      {ThongTinNguoiDungDangNhap !== null
        ? (
          <Fragment>
            <MenuItem
              onClick={() => { navigate(`/gio-hang/${ThongTinNguoiDungDangNhap.taiKhoan}`) }}
              className="w-full border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300
              lg:text-base
              md:text-sm"
            >
              Thông tin giỏ hàng
            </MenuItem>
            <MenuItem
              onClick={() => { dispatch(dangXuat()) }}
              className="w-full border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300
              lg:text-base
              md:text-sm"
            >
              Đăng xuất
            </MenuItem>
          </Fragment>
        )
        : (
          <>
            <MenuItem className="w-full border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300
            lg:text-base
            md:text-sm">
              <Link to={"/dangky"}>Đăng ký</Link>
            </MenuItem>
            <MenuItem className="w-full border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300
            lg:text-base
            md:text-sm">
              <Link to={"/dangnhap"}>Đăng nhập</Link>
            </MenuItem>
          </>
        )}
    </Menu>
  );

  //Điều khiển hiển thị thanh input tìm kiếm phim
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);
  const handleDisplaySearchInput = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };
  //Kết quả nhập vào thanh input tìm kiếm
  const onSearch = (value) => console.log(value);

  //Render thanh input tìm kiếm phim
  const renderSearchInput = () => {
    let disabledInput = '';
    if (isSearchOpen) {
      disabledInput = '';
    } else {
      disabledInput = 'hidden';
    }
    return <div
      className={`${disabledInput} lg:w-9/12 lg:mx-auto lg:mt-2 lg:relative
      md:w-9/12 md:mx-auto md:mt-2 md:relative`}
      ref={ref}
    >
      <Search
        placeholder="Nhập tên phim cần tìm"
        onSearch={onSearch}
        enterButton />
    </div>
  }

  return (
    <div className='header-template-main 
    w-full h-20 bg-black relative
    lg:w-full lg:h-fit lg:py-3 lg:bg-black/60 lg:absolute lg:z-10
    md:w-full md:h-fit md:py-3 md:bg-black/60 md:absolute md:z-10'>
      <div className='
      w-full px-1 flex justify-between items-start pt-2
      lg:w-10/12 lg:mx-auto lg:flex-none lg:grid lg:grid-cols-12 lg:pt-0
      md:w-11/12 md:mx-auto md:flex-none md:grid md:grid-cols-12 md:pt-0'>
        <div className='
        w-28
        lg:col-span-2 lg:w-fit
        md:col-span-2 md:w-fit'>
          <Link to={'/'}>
            <img src={logo} />
          </Link>
        </div>
        <div className='
        w-full absolute left-0 bottom-2 px-3 flex justify-between
        lg:static lg:col-span-8 lg:flex lg:items-center lg:justify-between lg:w-8/12 lg:mx-auto lg:my-auto
        md:static md:col-span-6 md:flex md:items-center md:justify-between md:mx-3 md:my-auto'>
          <h3 className='font-bold text-white cursor-pointer hover:text-rose-500
          lg:text-xl
          md:text-xl'>
            Mua vé
          </h3>
          <h3 className='font-bold text-white cursor-pointer hover:text-rose-500
          lg:text-xl
          md:text-xl'>
            Phim
          </h3>
          <h3 className='font-bold text-white cursor-pointer hover:text-rose-500
          lg:text-xl
          md:text-xl'>
            Rạp
          </h3>
          <h3 className='font-bold text-white cursor-pointer hover:text-rose-500
          lg:text-xl
          md:text-xl'>
            Tin điện ảnh
          </h3>
        </div>
        <div className='
        flex my-auto mr-3
        lg:col-span-2 lg:px-3 lg:flex lg:items-center lg:justify-between lg:mr-0
        md:col-span-4 md:px-3 md:flex md:items-center md:justify-end md:mr-0'>
          <button
            className='font-bold rounded-2xl bg-rose-600 text-white hover:bg-black
            py-1 px-2 mr-2 text-xs
            lg:text-base lg:py-1 lg:px-4 lg:mr-0  
            md:text-base md:py-1 md:px-4 md:mr-3'
            onClick={handleDisplaySearchInput}
          >
            Tìm kiếm
          </button>
          <Popover
            content={<a onClick={hide}>{contentMenuBar}</a>}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <button className='font-bold rounded-3xl bg-rose-600 text-white hover:bg-black
            py-1 px-2 flex items-center
            lg:text-base lg:py-1 lg:px-1 lg:flex lg:justify-between lg:items-center
            md:text-base md:py-1 md:px-1 md:flex md:justify-between md:items-center'>
              <FontAwesomeIcon
                className='
                text-lg px-2
                lg:text-xl lg:px-1
                md:text-xl md:px-1'
                icon={faBars} />
              {
                ThongTinNguoiDungDangNhap !== null
                  ? <img
                    className='rounded-full
                     w-6
                    lg:w-10 lg:px-1
                    md:w-10 md:px-1'
                    src={ThongTinNguoiDungDangNhap.avatar} />
                  : <FontAwesomeIcon
                    className='
                    text-lg px-1
                    lg:text-3xl lg:px-1
                    md:text-3xl md:px-1'
                    icon={faUserCircle} />
              }
            </button>
          </Popover>
        </div>
      </div>
      {renderSearchInput()}
    </div>
  )
}
