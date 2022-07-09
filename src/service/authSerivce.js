import { httpSerivce } from "./configURL";

export const authService = {
    dangNhap: (formData) => {
        return httpSerivce.post(`/api/QuanLyNguoiDung/DangNhap`, formData);
    },

    dangKy: (formData) => {
        return httpSerivce.post(`/api/QuanLyNguoiDung/DangKy`, formData);
    }
};