
import { userAPI } from "../features/users/userAPI";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { loginAPI } from "../features/login/loginAPI";
import userSlice from "../features/users/userSlice";
import { appointmentsAPI } from "../features/appointments/appointmentsAPI";
import { paymentsAPI } from "../features/payment/paymentsAPI";
import { complaintsAPI } from "../features/complaint/complaintsAPI";
import { prescriptionsAPI } from "../features/prescription/prescriptionsAPI";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user', 'admin']
}
const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [appointmentsAPI.reducerPath]: appointmentsAPI.reducer,
    [paymentsAPI.reducerPath]: paymentsAPI.reducer,
    [complaintsAPI.reducerPath]: complaintsAPI.reducer,
    [prescriptionsAPI.reducerPath]:prescriptionsAPI.reducer,
    user: userSlice,


});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(userAPI.middleware)
        .concat(loginAPI.middleware)
        .concat(appointmentsAPI.middleware)
        .concat(paymentsAPI.middleware)
        .concat(complaintsAPI.middleware)
        .concat(prescriptionsAPI.middleware)

});
export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
