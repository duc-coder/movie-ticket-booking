import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { phimService } from "../service/phimService";
import { BannerPhim } from "../_core/ThongTinBanner";
import { DanhSachPhim, ThongTinPhim } from "../_core/ThongTinPhim";

const initialState = {
    danhSachBanner: [BannerPhim],
    danhSachPhim: DanhSachPhim,
    thongTinPhim: ThongTinPhim,
};

export const getDanhSachBannerAsync = createAsyncThunk(
    'phimSlice/fetchDanhSachBanner',
    async () => {
        let result = await phimService.layDanhSachBanner();
        return result.data.content;
    }
);

export const getDanhSachPhimAsync = createAsyncThunk(
    'phimSlice/fetchDanhSachPhim',
    async (tenPhim) => {
        let result = await phimService.layDanhSachPhim(tenPhim);

        return result.data.content;
    }
);

export const getThongTinPhimAsync = createAsyncThunk(
    'phimSlice/fetchThongTinPhim',
    async () => {
        let result = await phimService.layThongTinPhim();

        return result.data.content;
    }
);

export const themPhimUploadHinhAsync = createAsyncThunk(
    'phimSlice/themPhimUploadHinh',
    async (formData) => {
        try {
            let result = await phimService.themPhimUploadHinh(formData);
            message.success('Upload phim thành công!');
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const capNhatPhimUploadAsync = createAsyncThunk(
    'phimSlice/capNhatPhimUpload',
    async (formData) => {
        try {
            let result = await phimService.capNhatPhimUpload(formData);
            message.success('Cập nhật phim thành công!');
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const xoaPhimUploadAsync = createAsyncThunk(
    'phimSlice/xoaPhimUpload',
    async (maPhim) => {
        try {
            let result = await phimService.xoaPhim(maPhim);
            message.success('Xoá phim thành công!');
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const phimSlice = createSlice({
    name: 'phim',
    initialState,
    reducers: {
        getDanhSachBanner: (state, action) => {
            state.danhSachBanner = action.payload;
        },

        getDanhSachPhim: (state, action) => {
            state.danhSachPhim = action.payload;
        },

        getThongTinPhim: (state, action) => {
            state.thongTinPhim = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDanhSachBannerAsync.fulfilled, (state, action) => {
                state.danhSachBanner = action.payload;
            })
            .addCase(getDanhSachPhimAsync.fulfilled, (state, action) => {
                state.danhSachPhim = action.payload;
            })
            .addCase(getThongTinPhimAsync.fulfilled, (state, action) => {
                state.thongTinPhim = action.payload;
            })
    },
});

export const { getDanhSachBanner, getDanhSachPhim, getThongTinPhim } = phimSlice.actions;

export const selectDanhSachBanner = (state) => state.phimSlice.danhSachBanner;
export const selectDanhSachPhim = (state) => state.phimSlice.danhSachPhim;
export const selectThongTinPhim = (state) => state.phimSlice.thongTinPhim;

export default phimSlice.reducer;