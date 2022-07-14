import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDanhSachLichChieuHeThongRapAsync, selectDanhSachLichChieuHeThongRap } from '../../../../reduxToolkit/rapSlice';
import DanhSachPhimContainer from './DanhSachPhimContainer';
import { Tabs } from 'antd';
import styles from '../css/CumRap_DanhSachPhimContainer.css';
import _ from 'lodash';
const { TabPane } = Tabs;

export default function CumRap_DanhSachPhimContainer(props) {

    let dispatch = useDispatch();

    //Nhận props từ BookingTicketBoxHomePage
    let maHeThongRap = props.maHeThongRap;

    useEffect(() => {
        if (maHeThongRap !== null) {
            //Gọi API lấy danh sách phim theo hệ thống rạp đang chọn
            dispatch(getDanhSachLichChieuHeThongRapAsync(maHeThongRap));
        };
    }, [maHeThongRap]);

    //Lấy danh sách lịch chiếu từ redux theo hệ thống rạp đang chọn
    let danhSachLichChieuHeThongRap = _.first(useSelector(selectDanhSachLichChieuHeThongRap));
    let DSLichChieuHeThongRap = [];
    if (danhSachLichChieuHeThongRap !== undefined) {
        DSLichChieuHeThongRap = danhSachLichChieuHeThongRap.lstCumRap
    };

    let tabValue = DSLichChieuHeThongRap.map((cumRap, index) => { //Thêm key number vào danh sách hệ thống rạp
        let renderKey = () => { // Tạo key number tuỳ theo số lượng hệ thống rạp
            for (let i = 0; i < DSLichChieuHeThongRap.length; i++) {
                let a = 1;
                return a = a + index;
            };
        };
        return {
            danhSachPhim: cumRap.danhSachPhim,
            hinhAnh: cumRap.hinhAnh,
            diaChi: cumRap.diaChi,
            maCumRap: cumRap.maCumRap,
            tenCumRap: cumRap.tenCumRap,
            key: renderKey(),
        };
    });

    //State lưu trữ danh sách phim theo cụm rạp
    let [DSPhim, setDSPhim] = useState(null);
    if (DSPhim === null && tabValue.length > 1) {
        DSPhim = tabValue[0].danhSachPhim;
    };

    //render danh sách cụm rạp
    const CumRapTabNavContent = (cumRap) => {
        return <div
            className=''
            onClick={() => { setDSPhim(cumRap.danhSachPhim) }}
        >
            <p className='font-bold text-left text-rose-500
            md:text-xs md:break-words
            lg:text-lg'
            >
                {cumRap.tenCumRap}
            </p>
            <p className='text-left
            md:text-xs md:inline md:break-words
            lg:text-sm'
            >
                {cumRap.diaChi}
                </p>
        </div>
    }

    const renderDanhSachCumRap = () => {
        return tabValue.map((cumRap, index) => {
            return <TabPane
                tab={CumRapTabNavContent(cumRap)}
                key={cumRap.key}
                className='w-full'
            >
                <DanhSachPhimContainer DSPhim={DSPhim} />
            </TabPane>
        });
    };

    return (
        <div
            className='cum-rap-danh-sach-phim-container-main-div w-full'
        >
            <Tabs
                tabPosition='left'
                className='w-full overflow-hidden'
            >
                {renderDanhSachCumRap()}
            </Tabs>
        </div>
    )
}
