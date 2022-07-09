import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authSerivce";
import { localUserStorageService } from "../service/localService";
import { message } from "antd";
import userPic from '../assets/img/user_pic.png';

const initialState = {
    ThongTinNguoiDungDangNhap: localUserStorageService.getUserLocal(),
};

export const dangNhapAsync = createAsyncThunk(
    'authSlice/dangNhap',
    async (formData) => {
        try {
            let result = await authService.dangNhap(formData);
            //Set ảnh avatar mặc định khi mới tạo tài khoản
            let thongTinNguoiDung = result.data.content;
            if (thongTinNguoiDung.avatar === undefined) {
                thongTinNguoiDung = {
                    ...thongTinNguoiDung,
                    avatar: userPic,
                };
            };
            //Lưu thông tin người dùng đến localStorage
            localUserStorageService.setUserLocal(thongTinNguoiDung);
            message.success('Đăng nhập thành công!');
            return thongTinNguoiDung;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const dangKyAsync = createAsyncThunk(
    'authSlice/dangKy',
    async (formData) => {
        try {
            let result = await authService.dangKy(formData);
            message.success('Đăng ký người dùng mới thành công!');
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const nguoiDungSlice = createSlice({
    name: 'nguoiDung',
    initialState,
    reducers: {
        dangNhap: (state, action) => {
            localUserStorageService.setUserLocal(action.payload);
            state.ThongTinNguoiDungDangNhap = action.payload;
        },
        dangXuat: (state, action) => {
            localUserStorageService.removeUserLocal();
            state.ThongTinNguoiDungDangNhap = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dangNhapAsync.fulfilled, (state, action) => {
                state.ThongTinNguoiDungDangNhap = action.payload;
            })
    },
});

export const { dangNhap, dangXuat } = nguoiDungSlice.actions;

export const selectThongTinNguoiDungDangNhap = (state) => state.authSlice.ThongTinNguoiDungDangNhap;

export default nguoiDungSlice.reducer;