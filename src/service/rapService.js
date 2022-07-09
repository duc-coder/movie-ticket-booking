import { httpSerivce } from "./configURL";

export const rapService = {
    layThongTinHeThongRap: (maHeThongRap = '') => {
        if (maHeThongRap.trim() !== '') {
            return httpSerivce.get(`/api/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${maHeThongRap}`);
        } else {
            return httpSerivce.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
        };
    },

    layThongTinCumRapTheoHeThong: (maHeThongRap) => {
        return httpSerivce.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    },

    layThongTinLichChieuHeThongRap: (maHeThongRap = '') => {
        if (maHeThongRap.trim() !== '') {
            return httpSerivce.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`);
        } else {
            return httpSerivce.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?&maNhom=GP01`);
        };
    },

    layThongTinLichChieuPhim: (maPhim) => {
        return httpSerivce.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
    },
};