import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rapService } from "../service/rapService";
import { ThongTinLichChieuPhim } from "../_core/ThongTinPhim";
import { CumRapChieu, HeThongRapChieu } from "../_core/ThongTinRap";

const initialState = {
    danhSachHeThongRap: [HeThongRapChieu],
    danhSachCumRap: [CumRapChieu],
    danhSachLichChieuHeThongRap: [],
    danhSachLichChieuPhim: ThongTinLichChieuPhim,
};

export const getDanhSachHeThongRapAsync = createAsyncThunk(
    'rapSlice/fetchDanhSachHeThongRap',
    async (maHeThongRap) => {
        let result = await rapService.layThongTinHeThongRap(maHeThongRap);
        return result.data.content;
    }
);

export const getDanhSachCumRapAsync = createAsyncThunk(
    'rapSlice/fetchDanhSachCumRap',
    async (maHeThongRap) => {
        let result = await rapService.layThongTinCumRapTheoHeThong(maHeThongRap);
        return result.data.content;
    }
);

export const getDanhSachLichChieuHeThongRapAsync = createAsyncThunk(
    'rapSlice/fetchDanhSachLichChieuHeThongRap',
    async (maHeThongRap) => {
        let result = await rapService.layThongTinLichChieuHeThongRap(maHeThongRap);
        return result.data.content;
    }
);

export const getDanhSachLichChieuPhimAsync = createAsyncThunk(
    'rapSlice/fetchDanhSachLichChieuPhim',
    async (maPhim) => {
        let result = await rapService.layThongTinLichChieuPhim(maPhim);
        return result.data.content;
    }
);

export const rapSlice = createSlice({
    name: 'rap',
    initialState,
    reducers: {
        getDanhSachHeThongRap: (state, action) => {
            state.danhSachHeThongRap = action.payload;
        },

        getDanhSachCumRap: (state, action) => {
            state.danhSachCumRap = action.payload;
        },

        getDanhSachLichChieuHeThongRap: (state, action) => {
            state.danhSachLichChieuHeThongRap = action.payload;
        },

        getDanhSachLichChieuPhim: (state, action) => {
            state.danhSachLichChieuPhim = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDanhSachHeThongRapAsync.fulfilled, (state, action) => {
                state.danhSachHeThongRap = action.payload;
            })
            .addCase(getDanhSachCumRapAsync.fulfilled, (state, action) => {
                state.danhSachCumRap = action.payload;
            })
            .addCase(getDanhSachLichChieuHeThongRapAsync.fulfilled, (state, action) => {
                state.danhSachLichChieuHeThongRap = action.payload;
            })
            .addCase(getDanhSachLichChieuPhimAsync.fulfilled, (state, action) => {
                state.danhSachLichChieuPhim = action.payload;
            })
    },
});

export const { getDanhSachHeThongRap, getDanhSachCumRap, getDanhSachLichChieuHeThongRap, getDanhSachLichChieuPhim } = rapSlice.actions;

export const selectDanhSachHeThongRap = (state) => state.rapSlice.danhSachHeThongRap;
export const selectDanhSacCumRap = (state) => state.rapSlice.danhSachCumRap;
export const selectDanhSachLichChieuHeThongRap = (state) => state.rapSlice.danhSachLichChieuHeThongRap;
export const selectDanhSachLichChieuPhim = (state) => state.rapSlice.danhSachLichChieuPhim;

export default rapSlice.reducer;
