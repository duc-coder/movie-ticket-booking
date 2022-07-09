import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../service/nguoiDungService";
import { message } from "antd";

const initialState = {
    danhSachLoaiNguoiDung: [],
    danhSachNguoiDung: [],
};

export const danhSachLoaiNguoiDungAsync = createAsyncThunk(
    'nguoiDungSlice/danhSachLoaiNguoiDung',
    async () => {
        try {
            let result = await nguoiDungService.layDanhSachLoaiNguoiDung();
            return result.data.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const danhSachNguoiDungAsync = createAsyncThunk(
    'nguoiDungSlice/danhSachNguoiDung',
    async () => {
        try {
            let result = await nguoiDungService.layDanhSachNguoiDung();
            return result.data.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const xoaNguoiDungAsync = createAsyncThunk(
    'nguoiDungSlice/xoaNguoiDung',
    async (taiKhoan) => {
        try {
            let result = await nguoiDungService.xoaNguoiDung(taiKhoan);
            message.success('Xoá người dùng thành công!');
            return result.data.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const themNguoiDungAsync = createAsyncThunk(
    'nguoiDungSlice/themNguoiDung',
    async (formData) => {
        try {
            let result = await nguoiDungService.themNguoiDung(formData);
            message.success('Thêm người dùng mới thành công!');
            return result.data.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const capNhatThongTinNguoiDungAsync = createAsyncThunk(
    'nguoiDungSlice/capNhatThongTinNguoiDung',
    async (formData) => {
        try {
            let result = await nguoiDungService.capNhatThongTinNguoiDung(formData);
            message.success('Cập nhật thông tin người dùng thành công!');
            return result.data.content;
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
        getLoaiNguoiDung: (state, action) => {
            state.danhSachLoaiNguoiDung = action.payload;
        },
        getDanhSachNguoiDung: (state, action) => {
            state.danhSachNguoiDung = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(danhSachLoaiNguoiDungAsync.fulfilled, (state, action) => {
                state.danhSachLoaiNguoiDung = action.payload;
            })
            .addCase(danhSachNguoiDungAsync.fulfilled, (state, action) => {
                state.danhSachNguoiDung = action.payload;
            })
    },
});

export const { getDanhSachNguoiDung, getLoaiNguoiDung } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;