import React from 'react';
import _ from 'lodash';
import moment from 'moment';

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
                    <p className='font-bold my-1
                    text-base
                    md:text-lg
                    lg:text-xl'>
                        {ve.tenPhim}
                    </p>
                    <p className='my-1'><b>Thời lượng phim:</b> {ve.thoiLuongPhim} phút</p>
                    <p className='my-1'><b>Ngày đặt:</b> {moment(ve.ngayDat).format(dateFormat)}</p>
                    <p className='my-1'><b>Giá vé:</b> {ve.giaVe.toLocaleString()} VND</p>
                    <p className='my-1'><b>Mã vé:</b> {ve.maVe}</p>
                </div>
            </div>
        });
    };

    return (
        <div style={{ height: 550 }} className='w-full grid overflow-y-scroll
        grid-cols-1
        lg:grid-cols-2'>
            {renderDanhSachDatVe()}
        </div>
    )
}
