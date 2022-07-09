import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { datVeService } from "../service/datVeService";
import { message } from "antd";

const initialState = {
    danhSachPhongVe: [],
};

export const danhSachPhongVeAsync = createAsyncThunk(
    'datVeSlice/danhSachPhongVe',
    async (maLichChieu) => {
        try {
            let result = await datVeService.layDanhSachPhongVe(maLichChieu);

            return result.data.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const datVeAsync = createAsyncThunk(
    'datVeSlice/datVe',
    async (formData) => {
        try {
            let result = await datVeService.datVe(formData);
            message.success('Đặt vé thành công!');
            return result.data.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const taoLichChieuAsync = createAsyncThunk(
    'datVeSlice/taoLichChieu',
    async (formData) => {
        try {
            let result = await datVeService.taoLichChieu(formData);
            message.success('Tạo lịch chiếu thành công!');
            return result.data.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const datVeSlice = createSlice({
    name: 'datVe',
    initialState,
    reducers: {
        getDanhSachPhongVe: (state, action) => {
            state.danhSachPhongVe = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(danhSachPhongVeAsync.fulfilled, (state, action) => {
                state.danhSachPhongVe = action.payload;
            })
    },
});

export const { getDanhSachPhongVe } = datVeSlice.actions;

export default datVeSlice.reducer;