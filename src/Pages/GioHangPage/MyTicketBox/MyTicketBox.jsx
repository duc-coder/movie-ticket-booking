import React from 'react';
import _ from 'lodash';
import moment from 'moment';

// giaVe: 75000
// hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/doraemon-nobita-no-little-wars-2021_gp01.jpg"
// maVe: 81962
// ngayDat: "2022-06-25T03:25:35.68"
// tenPhim: "DORAEMON: NOBITA NO LITTLE WARS 2021"
// thoiLuongPhim: 120
const dateFormat = 'hh:mm - DD/MM/YYYY'
export default function MyTicketBox({ thongTinNguoiDungDangNhap }) {

    let danhSachDatVe = [];
    if (!_.isEmpty(thongTinNguoiDungDangNhap)) {
        danhSachDatVe = thongTinNguoiDungDangNhap.thongTinDatVe;
    };

    const renderDanhSachDatVe = () => {
        return danhSachDatVe.map((ve, index) => {
            return <div
                key={index}
                className='m-2 p-2 flex justify-start rounded-xl border border-gray-300 shadow-lg'
            >
                <div className='w-28 overflow-hidden'>
                    <img className='h-40 bg-cover' src={ve.hinhAnh} />
                </div>
                <div className='ml-5'>
                    <p className='text-xl font-bold'>{ve.tenPhim}</p>
                    <p className=''><b>Thời lượng phim:</b> {ve.thoiLuongPhim} phút</p>
                    <p className=''><b>Ngày đặt:</b> {moment(ve.ngayDat).format(dateFormat)}</p>
                    <p className=''><b>Giá vé:</b> {ve.giaVe.toLocaleString()} VND</p>
                    <p className=''><b>Mã vé:</b> {ve.maVe}</p>
                </div>
            </div>
        });
    };

    return (
        <div style={{height: 550}} className='w-full grid grid-cols-2 overflow-y-scroll'>
            {renderDanhSachDatVe()}
        </div>
    )
}
