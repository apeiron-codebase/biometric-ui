// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slices/authSlice'
// import uiReducer from './slices/uiSlice'
import { employeeApi } from "./api/employeeApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware, authApi.middleware, userApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
