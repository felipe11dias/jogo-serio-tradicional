import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import userReducer from './slices/userSlice';


const userPersistConfig = {
  key: 'jogosSerios',
  storage
}


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState: persistReducer(userPersistConfig, userReducer)
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: [authApi.middleware, userApi.middleware, thunk],
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
