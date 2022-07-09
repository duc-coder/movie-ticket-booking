import { httpSerivce } from "./configURL";
const maNhom = 'GP03';

export const phimService = {
    layDanhSachBanner: () => {
        return httpSerivce.get(`/api/QuanLyPhim/LayDanhSachBanner`);
    },

    layDanhSachPhim: (tenPhim = '') => {
        if (tenPhim.trim() !== '') {
            return httpSerivce.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&tenPhim=${tenPhim}`);
        } else {
            return httpSerivce.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`);
        };
    },

    layThongTinPhim: (maPhim) => {
        return httpSerivce.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    },

    themPhimUploadHinh: (formData) => {
        return httpSerivce.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    },

    capNhatPhimUpload: (formData) => {
        return httpSerivce.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
    },

    xoaPhim: (maPhim) => {
        return httpSerivce.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    },
};