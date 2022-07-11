import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../service/nguoiDungService";
import { message } from "antd";
import _ from 'lodash';

const initialState = {
    danhSachLoaiNguoiDung: [],
    danhSachNguoiDung: [],
    thongTinNguoiDung: {},
    formChinhSuaHoSoOpen: false,
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
    async (tuKhoa) => {
        try {
            let result = await nguoiDungService.layDanhSachNguoiDung(tuKhoa);
            if (tuKhoa.trim() !== '') {
                return _.first(result.data.content);
            } else {
                return result.data.content;
            };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const layThongTinNguoiDungAsync = createAsyncThunk(
    'nguoiDungSlice/layThongTinNguoiDung',
    async () => {
        try {
            let result = await nguoiDungService.layThongTinNguoiDung();
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
    async (formData, thunkAPI) => {
        try {
            let result = await nguoiDungService.capNhatThongTinNguoiDung(formData);
            message.success('Cập nhật thông tin người dùng thành công!');
            thunkAPI.dispatch(anFormChinhSuaHoSo()); // Ẩn form thông tin sau khi thay đổi thông tin thành công
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
        getThongTinNguoiDung: (state, action) => {
            state.thongTinNguoiDung = action.payload;
        },
        hienThiFormChinhSuaHoSo: (state, action) => {
            state.formChinhSuaHoSoOpen = true;
        },
        anFormChinhSuaHoSo: (state, action) => {
            state.formChinhSuaHoSoOpen = false;
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
            .addCase(layThongTinNguoiDungAsync.fulfilled, (state, action) => {
                state.thongTinNguoiDung = action.payload;
            })
            .addCase(capNhatThongTinNguoiDungAsync.fulfilled, (state, action) => {
                state.danhSachNguoiDung = action.payload;
            })
    },
});

export const { getDanhSachNguoiDung, getThongTinNguoiDung, getLoaiNguoiDung, hienThiFormChinhSuaHoSo, anFormChinhSuaHoSo } = nguoiDungSlice.actions;

export const selectDanhSachNguoiDung = (state) => state.nguoiDungSlice.danhSachNguoiDung;
export const selectThongTinNguoiDung = (state) => state.nguoiDungSlice.thongTinNguoiDung;
export const selectFormChinhSuaHoSoOpen = (state) => state.nguoiDungSlice.formChinhSuaHoSoOpen;

export default nguoiDungSlice.reducer;