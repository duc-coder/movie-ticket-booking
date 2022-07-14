import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDanhSachLichChieuHeThongRapAsync, selectDanhSachLichChieuHeThongRap } from '../../../../reduxToolkit/rapSlice';
import DanhSachPhimContainer from './DanhSachPhimContainer';
import { Tabs } from 'antd';
import styles from '../css/CumRap_DanhSachPhimContainer.css';
import _ from 'lodash';
import useWindowDimensions from '../../../../HOOK/useWindowDimensions';
const { TabPane } = Tabs;

export default function CumRap_DanhSachPhimContainer(props) {

    let dispatch = useDispatch();

    //Nhận props từ BookingTicketBoxHomePage
    let maHeThongRap = props.maHeThongRap;



    //Kiểm tra kích cỡ màn hình
    let checkScreenDimension = useWindowDimensions();
    //Quy định vị trí tab navigation theo kích cỡ màn hình
    const [tabNavPosition, setTabNavPosition] = useState('left');
    useEffect(() => { //Set lại giá trị currentScreenDimesion mỗi khi resize kích cỡ màn hình
        if (checkScreenDimension.width > 320 && checkScreenDimension.width <= 640) {
            setTabNavPosition('top')
        };
    }, [checkScreenDimension]);

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
            className='
            w-36
            md:flex md:justify-start md:flex-wrap md:items-center
            lg:w-fit lg:flex-none'
            onClick={() => { setDSPhim(cumRap.danhSachPhim) }}
        >
            <p className='w-full font-bold text-rose-500
            text-xs break-words whitespace-pre-wrap text-center
            md:text-xs md:break-words md:whitespace-pre-wrap md:text-left
            lg:text-lg lg:break-words lg:whitespace-pre-wrap lg:text-left'
            >
                {cumRap.tenCumRap}
            </p>
            <span
                className='w-full  
                text-xs break-words whitespace-pre-wrap text-center
                md:text-xs md:break-words md:whitespace-pre-wrap md:text-left
                lg:text-sm lg:break-words lg:whitespace-pre-wrap lg:text-left'
            >
                {cumRap.diaChi}
            </span>
        </div>
    }

    const renderDanhSachCumRap = () => {
        return tabValue.map((cumRap, index) => {
            return <TabPane
                tab={CumRapTabNavContent(cumRap)}
                key={cumRap.key}
                className='md:max-h-96 md:overflow-y-scroll
                lg:overflow-y-hidden'
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
                tabPosition={tabNavPosition}
                className='w-full overflow-hidden'
            >
                {renderDanhSachCumRap()}
            </Tabs>
        </div>
    )
}
