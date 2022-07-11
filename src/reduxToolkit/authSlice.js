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
            let dataJson = result.data.content;
            if (dataJson.avatar === undefined) { //Set ảnh avatar mặc định khi mới tạo tài khoản
                dataJson = {
                    ...dataJson,
                    avatar: userPic,
                };
                localUserStorageService.setUserLocal(dataJson); //Lưu thông tin người dùng đến localStorage
            };
            message.success('Đăng nhập thành công!');
            return result.data.content;
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

export const uploadAvatar = createAsyncThunk(//Upload ảnh đại diện người dùng đến localUserStorage
    'authSlice/uploadAvatar',
    async (image) => {
        try {
            let dataJson = localUserStorageService.getUserLocal();
            if (dataJson) {
                localUserStorageService.setUserLocal({
                    ...dataJson,
                    avatar: image,
                });
            };
            message.success('Upload avatar mới thành công!');
            return image;
        } catch (error) {
            console.log(error);
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
        // uploadAvatar: (state, action) => {
        //     localUserStorageService.setUserLocal({
        //         ...localUserStorageService.getUserLocal(),
        //         avatar: action.payload,
        //     });
        //     state.ThongTinNguoiDungDangNhap.avatar = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dangNhapAsync.fulfilled, (state, action) => {
                let dataUser = action.payload;
                if (dataUser.avatar === undefined) {
                    dataUser = {
                        ...dataUser,
                        avatar: userPic,
                    };
                };
                state.ThongTinNguoiDungDangNhap = dataUser;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.ThongTinNguoiDungDangNhap.avatar = action.payload;
            })
    },
});

export const { dangNhap, dangXuat } = nguoiDungSlice.actions;

export const selectThongTinNguoiDungDangNhap = (state) => state.authSlice.ThongTinNguoiDungDangNhap;

export default nguoiDungSlice.reducer;