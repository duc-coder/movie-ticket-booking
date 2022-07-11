import { message } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SeatPic from '../../../assets/img/seat.png';
import { getSelectSeat } from '../../../reduxToolkit/datVeSlice';

export default function RenderGhe(props) {

    let dispatch = useDispatch();

    //Nhận value thông tin phim từ DatVePage
    let { DanhSachGhe } = props;

    //State lưu trữ ghế đang chọn
    let [seatSelect, setSeatSelect] = useState([]);

    useEffect(() => {
        dispatch(getSelectSeat(seatSelect)); //Truyền danh sách ghế đang chọn lên redux state datVeSlice
    }, [seatSelect])

    //Đặt giá trị color từng loại ghế
    let otherReservedSeat = 'border-red-500' //Ghế đã được đặt
    let normalEmptySeat = 'border-white' //Ghế trống chưa ai chọn loại thường
    let vipEmptySeat = 'border-yellow-500' //Ghế trống chưa ai chọn loại vip
    let mySelectingSeat = 'border-green-500' //Ghế chính người dùng đang chọn

    let cssEmtySeat = ''; //css hiện tại của ghế
    let cssOtherReservedSeat = '';//Tình trạng hiện tại ghế đã được đặt bởi người khác
    let cssMySelectSeat = ''//css hiện tại ghế chính người dùng đang chọn

    const handleSelectSeat = (ghe) => {
        let indexSelectSeat = seatSelect.findIndex((seat) => {//Xử lý chọn hoặc huỷ chọn ghế
            return seat.maGhe === ghe.maGhe;
        });
        if (indexSelectSeat === -1) {
            if (ghe.daDat) {
                message.error('Vui lòng không chọn ghế đã được đặt');
            } else {
                setSeatSelect([
                    ...seatSelect,
                    ghe,
                ]);
            }
        } else {
            let updateSeatSelect = [...seatSelect];
            updateSeatSelect.splice(indexSelectSeat, 1);
            setSeatSelect(updateSeatSelect);
        };
    };

    const renderDayGhe = () => {
        return DanhSachGhe.map((ghe, index) => {

            if (ghe.loaiGhe === 'Vip') {//Tình trạng ghế trống loại vip
                cssEmtySeat = vipEmptySeat;
            } else if (ghe.loaiGhe === 'Thuong') {//Tình trạng ghế trống loại thường
                cssEmtySeat = normalEmptySeat;
            };

            if (ghe.daDat) { //Tình trạng ghế đã đặt bởi người khác
                cssOtherReservedSeat = otherReservedSeat;
                cssEmtySeat = '';
            };

            //Thay đổi css ghế khi bấm chọn hoặc bấm huỷ
            let indexSelectSeat = seatSelect.findIndex((seat) => {
                return seat.maGhe === ghe.maGhe
            });
            if (indexSelectSeat !== -1) {
                cssMySelectSeat = mySelectingSeat;
                cssEmtySeat = '';
                cssOtherReservedSeat = '';
            };

            return <button
                key={index}
                className={`m-2 relative flex justify-center items-center cursor-pointer`}
                onClick={() => {
                    handleSelectSeat(ghe)
                }}
            >
                <p className='absolute text-white'>
                    {ghe.tenGhe}
                </p>
                <img className={`${cssOtherReservedSeat} ${cssEmtySeat} ${cssMySelectSeat} border-solid border rounded-full p-1`} src={SeatPic} />
            </button >
        })
    };

    return (
        <Fragment>
            {renderDayGhe()}
        </Fragment>
    )
}
