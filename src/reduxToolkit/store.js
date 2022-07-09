import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import datVeSlice from './datVeSlice';
import nguoiDungSlice from './nguoiDungSlice';
import phimSlice from './phimSlice';
import rapSlice from './rapSlice';

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    datVeSlice: datVeSlice,
    nguoiDungSlice: nguoiDungSlice,
    phimSlice: phimSlice,
    rapSlice: rapSlice,
  },
});
