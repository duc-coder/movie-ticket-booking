import ThemeLayout from "../HOC/ThemeLayout/ThemeLayout";
import ChiTietPhimPage from "../Pages/ChiTietPhimPage/ChiTietPhimPage";
import DangKyPage from "../Pages/DangKyPage/DangKyPage";
import DangNhapPage from "../Pages/DangNhapPage/DangNhapPage";
import DatVePage from "../Pages/DatVePage/DatVePage";
import GioHangPage from "../Pages/GioHangPage/GioHangPage";
import HomePage from "../Pages/HomePage/HomePage";

export const userRoutes = [
    {
        path: '/gio-hang/:taiKhoan',
        component: <ThemeLayout Component={GioHangPage} />,
        exact: true,
    },
    {
        path: '/dat-ve/:maLichChieu',
        component: <ThemeLayout Component={DatVePage} />,
        exact: true,
    },
    {
        path: '/phim/:maPhim',
        component: <ThemeLayout Component={ChiTietPhimPage} />,
        exact: true,
    },
    {
        path: '/dangKy',
        component: <ThemeLayout Component={DangKyPage} />,
        exact: true,
    },
    {
        path: '/dangNhap',
        component: <ThemeLayout Component={DangNhapPage} />,
        exact: true,
    },
    {
        path: '/',
        component: <ThemeLayout Component={HomePage} />,
        exact: true,
    },
];