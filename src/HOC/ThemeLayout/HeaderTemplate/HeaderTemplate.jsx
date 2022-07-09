import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import styles from '../css/HeaderTemplate.css';
import logo from '../../../assets/img/movie_tickets_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Search from 'antd/lib/transfer/search';
import { useDispatch, useSelector } from 'react-redux';
import { dangXuat, selectThongTinNguoiDungDangNhap } from '../../../reduxToolkit/authSlice';
import { Menu, Popover } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';

export default function HeaderTemplate() {

  let dispatch = useDispatch();

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
    <Menu className="w-52">
      {ThongTinNguoiDungDangNhap !== null
        ? (
          <MenuItem
            onClick={() => dispatch(dangXuat())}
            className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300"
          >
            Đăng xuất
          </MenuItem>
        )
        : (
          <>
            <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
              <Link to={"/dangky"}>Đăng ký</Link>
            </MenuItem>
            <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
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
      if (!ref.current.contains(event.target)) {
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
      className={`w-9/12 mx-auto mt-2 relative ${disabledInput}`}
      ref={ref}
    >
      <Search
        placeholder="Nhập tên phim cần tìm"
        onSearch={onSearch}
        enterButton />
    </div>
  }

  return (
    <div className='w-full py-3 bg-black/80'>
      <div className='w-10/12 mx-auto grid grid-cols-12'>
        <div className='col-span-2'>
          <Link to={'/'}>
            <img src={logo} />
          </Link>
        </div>
        <div className='col-span-8 flex items-center justify-between w-8/12 mx-auto'>
          <h3 className='text-xl font-bold text-white cursor-pointer hover:text-rose-500'>Mua vé</h3>
          <h3 className='text-xl font-bold text-white cursor-pointer hover:text-rose-500'>Phim</h3>
          <h3 className='text-xl font-bold text-white cursor-pointer hover:text-rose-500'>Rạp</h3>
          <h3 className='text-xl font-bold text-white cursor-pointer hover:text-rose-500'>Tin điện ảnh</h3>
        </div>
        <div className='col-span-2 px-3 flex items-center justify-between'>
          <button
            className='text-base font-bold py-1 px-4 rounded-2xl bg-rose-600 text-white hover:bg-black'
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
            <button className='text-base font-bold py-1 px-1 rounded-3xl bg-rose-600 text-white flex justify-between items-center hover:bg-black'>
              <FontAwesomeIcon className='text-xl px-1' icon={faBars} />
              {
                ThongTinNguoiDungDangNhap !== null
                  ? <img className='w-10 px-1 rounded-full' src={ThongTinNguoiDungDangNhap.avatar} />
                  : <FontAwesomeIcon className='text-3xl px-1' icon={faUserCircle} />
              }
            </button>
          </Popover>
        </div>
      </div>
      {renderSearchInput()}
    </div>
  )
}
