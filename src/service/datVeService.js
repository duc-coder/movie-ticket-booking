import { httpSerivce } from "./configURL";

export const datVeService = {
    layDanhSachPhongVe: (maLichChieu) => {
        return httpSerivce.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    },

    datVe: (formData) => {
        return httpSerivce.post(`/api/QuanLyDatVe/DatVe`, formData);
    },

    taoLichChieu: (formData) => {
        return httpSerivce.post(`/api/QuanLyDatVe/TaoLichChieu`, formData);
    },
};