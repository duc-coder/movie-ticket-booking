import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import syles from '../css/BookingTicketBoxHomePage.css';
import CumRap_DanhSachPhimContainer from './CumRap_DanhSachPhimContainer/CumRap_DanhSachPhimContainer';
import _ from 'lodash';
const { TabPane } = Tabs;

export default function BookingTicketBoxHomePage(props) {

    //Nhận props từ HomePage
    let { danhSachHeThongRap } = props;

    let tabValue = _.size(danhSachHeThongRap) > 1 ? danhSachHeThongRap.map((Rap, index) => { //Thêm key number vào danh sách hệ thống rạp
        let renderKey = () => { // Tạo key number tuỳ theo số lượng hệ thống rạp
            for (let i = 0; i < danhSachHeThongRap.length; i++) {
                let a = 1;
                return a = a + index;
            };
        };
        return {
            biDanh: Rap.biDanh,
            logo: Rap.logo,
            maHeThongRap: Rap.maHeThongRap,
            tenHeThongRap: Rap.tenHeThongRap,
            key: renderKey(),
        };
    }) : [];

    //State lưu trữ maHeThongRap đang chọn hiện tại
    let [maHTRap, setMaHTRap] = useState(null);
    if (maHTRap === null && tabValue.length > 1) {
        maHTRap = tabValue[0].maHeThongRap;
    };

    //render danh sách hệ thống rạp
    const contentTabNav = (rap) => {
        return <div
            className='
            md:flex md:flex-wrap md:justify-center md:items-center md:w-28
            lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:w-full'
            onClick={() => { setMaHTRap(rap.maHeThongRap) }}
        >
            <img className='h-10 mb-2' src={rap.logo} />
            <p className='w-full text-center
            md:text-xs'>
                {rap.tenHeThongRap}
            </p>
        </div>
    }
    const renderHeThongRap = () => {
        return tabValue.map((Rap, index) => {
            return <TabPane tab={contentTabNav(Rap)} key={Rap.key} className='w-11/12 mx-auto flex flex-wrap justify-center shadow-xl mb-5 border border-gray-200 rounded'>
                <CumRap_DanhSachPhimContainer maHeThongRap={maHTRap} />
            </TabPane>
        });
    };

    return (
        <div className='booking-ticket-box-main-div mt-10'>
            <Tabs defaultActiveKey='1' centered>
                {renderHeThongRap()}
            </Tabs>
        </div>
    )
}
